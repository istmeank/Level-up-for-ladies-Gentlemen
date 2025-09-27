import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate, useSearchParams } from "react-router-dom";
import { User, Session } from "@supabase/supabase-js";
import { toast } from "sonner";
import { authSchema, type AuthFormData } from "@/lib/validation";

const Auth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const defaultTab = searchParams.get("tab") || "signup";

  // Auth state management
  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        // Redirect authenticated users to home
        if (session?.user) {
          navigate("/");
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      // Redirect if already authenticated
      if (session?.user) {
        navigate("/");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const signUp = async (email: string, password: string) => {
    // Validate input data
    try {
      authSchema.parse({ email, password });
    } catch (error: any) {
      toast.error(error.errors?.[0]?.message || "Données invalides");
      return;
    }

    setLoading(true);
    const redirectUrl = `${window.location.origin}/`;
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl
      }
    });
    
    setLoading(false);
    
    if (error) {
      if (error.message.includes("User already registered")) {
        toast.error("Un compte existe déjà avec cette adresse email. Essayez de vous connecter.");
      } else {
        toast.error("Erreur lors de l'inscription. Veuillez réessayer.");
      }
    } else {
      toast.success("Vérifiez votre email pour confirmer votre inscription !");
    }
  };

  const signIn = async (email: string, password: string) => {
    // Validate input data
    try {
      authSchema.parse({ email, password });
    } catch (error: any) {
      toast.error(error.errors?.[0]?.message || "Données invalides");
      return;
    }

    setLoading(true);
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    setLoading(false);
    
    if (error) {
      if (error.message.includes("Invalid login credentials")) {
        toast.error("Identifiants invalides. Vérifiez votre email et mot de passe.");
      } else {
        toast.error("Erreur de connexion. Veuillez réessayer.");
      }
    }
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/`
      }
    });
    
    setLoading(false);
    
    if (error) {
      // Provide specific error messages based on error type without exposing sensitive details
      if (error.message.includes('403') || error.message.includes('access')) {
        toast.error("Erreur 403: Configuration Google requise. Vérifiez les URLs autorisées dans Google Cloud Console.");
      } else if (error.message.includes('redirect')) {
        toast.error("Erreur de redirection. Vérifiez la configuration des URLs dans Supabase.");
      } else if (error.message.includes('oauth')) {
        toast.error("Erreur OAuth. Vérifiez que Google est activé dans Supabase Auth.");
      } else {
        toast.error("Erreur lors de la connexion Google. Veuillez réessayer.");
      }
    }
  };

  const AuthForm = ({ mode }: { mode: "signin" | "signup" }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (mode === "signup") {
        await signUp(email, password);
      } else {
        await signIn(email, password);
      }
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="votre@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-card/50 border-cosmic-stellar-gold/20"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Mot de passe</Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="bg-card/50 border-cosmic-stellar-gold/20"
          />
        </div>
        <Button
          type="submit"
          disabled={loading}
          className="w-full"
          variant={mode === "signup" ? "darkCosmic" : "cosmic"}
        >
          {loading ? "Chargement..." : mode === "signup" ? "S'inscrire" : "Se connecter"}
        </Button>
        
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-cosmic-stellar-gold/20" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">Ou</span>
          </div>
        </div>
        
        <Button
          type="button"
          variant="outline"
          onClick={signInWithGoogle}
          disabled={loading}
          className="w-full gap-2 border-cosmic-stellar-gold/30 hover:bg-cosmic-stellar-gold/10"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          {loading ? "Chargement..." : `${mode === "signup" ? "S'inscrire" : "Se connecter"} avec Google`}
        </Button>
      </form>
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-cosmic-deep-space via-background to-cosmic-deep-space">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img 
            src="/logo-level-up.svg" 
            alt="LEVEL UP" 
            className="w-16 h-16 mx-auto mb-4 filter drop-shadow-[0_0_20px_hsl(var(--cosmic-stellar-gold)/0.8)]"
          />
          <h1 className="text-3xl font-bold cosmic-text mb-2">LEVEL UP</h1>
          <p className="text-muted-foreground">Rejoignez l'univers cosmique</p>
        </div>

        <Card className="bg-card/80 backdrop-blur-sm border-cosmic-stellar-gold/20">
          <CardHeader className="text-center">
            <CardTitle className="cosmic-text">Authentification</CardTitle>
            <CardDescription>
              Créez votre compte ou connectez-vous à votre espace
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue={defaultTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="signup">S'inscrire</TabsTrigger>
                <TabsTrigger value="signin">Se connecter</TabsTrigger>
              </TabsList>
              
              <TabsContent value="signup">
                <AuthForm mode="signup" />
              </TabsContent>
              
              <TabsContent value="signin">
                <AuthForm mode="signin" />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="text-cosmic-stellar-gold hover:text-cosmic-stellar-gold/80"
          >
            ← Retour à l'accueil
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Auth;