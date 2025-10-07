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
import { useTranslation } from "react-i18next";

const Auth = () => {
  const { t } = useTranslation();
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
      toast.error(error.errors?.[0]?.message || t('auth.errors.invalidData'));
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
        toast.error(t('auth.errors.userExists'));
      } else {
        toast.error(t('auth.errors.signUpError'));
      }
    } else {
      toast.success(t('auth.success.checkEmail'));
    }
  };

  const signIn = async (email: string, password: string) => {
    // Validate input data
    try {
      authSchema.parse({ email, password });
    } catch (error: any) {
      toast.error(error.errors?.[0]?.message || t('auth.errors.invalidData'));
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
        toast.error(t('auth.errors.invalidCredentials'));
      } else {
        toast.error(t('auth.errors.signInError'));
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
      if (error.message.includes('403') || error.message.includes('access')) {
        toast.error(t('auth.errors.google403'));
      } else if (error.message.includes('redirect')) {
        toast.error(t('auth.errors.googleRedirect'));
      } else if (error.message.includes('oauth')) {
        toast.error(t('auth.errors.googleOAuth'));
      } else {
        toast.error(t('auth.errors.googleError'));
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
          <Label htmlFor="email">{t('auth.email')}</Label>
          <Input
            id="email"
            type="email"
            placeholder={t('auth.emailPlaceholder')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-card/50 border-cosmic-stellar-gold/20"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">{t('auth.password')}</Label>
          <Input
            id="password"
            type="password"
            placeholder={t('auth.passwordPlaceholder')}
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
          {loading ? t('auth.loading') : mode === "signup" ? t('auth.signUp') : t('auth.signIn')}
        </Button>
        
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-cosmic-stellar-gold/20" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">{t('auth.or')}</span>
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
          {loading ? t('auth.loading') : mode === "signup" ? t('auth.signUpWithGoogle') : t('auth.signInWithGoogle')}
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
          <h1 className="text-3xl font-bold cosmic-text mb-2">{t('auth.title')}</h1>
          <p className="text-muted-foreground">{t('auth.subtitle')}</p>
        </div>

        <Card className="bg-card/80 backdrop-blur-sm border-cosmic-stellar-gold/20">
          <CardHeader className="text-center">
            <CardTitle className="cosmic-text">{t('auth.authentication')}</CardTitle>
            <CardDescription>
              {t('auth.createOrLogin')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue={defaultTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="signup">{t('auth.signUp')}</TabsTrigger>
                <TabsTrigger value="signin">{t('auth.signIn')}</TabsTrigger>
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
            ← {t('auth.backToHome')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Auth;