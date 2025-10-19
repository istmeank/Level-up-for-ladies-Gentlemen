import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, Video, Image, Shield, Edit } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { formationSchema, videoFileSchema, imageFileSchema, type FormationFormData } from "@/lib/validation";
import { useTranslation } from "react-i18next";

interface Formation {
  id: string;
  title: string;
  description: string;
  thumbnail_url: string | null;
  is_published: boolean;
}

const FormationUpload = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingPermissions, setCheckingPermissions] = useState(true);
  const [formations, setFormations] = useState<Formation[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: 0,
    duration: 0,
    level: 'débutant'
  });

  useEffect(() => {
    checkAdminRole();
    fetchFormations();
  }, []);

  const fetchFormations = async () => {
    try {
      const { data, error } = await supabase
        .from('formations')
        .select('id, title, description, thumbnail_url, is_published')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setFormations(data || []);
    } catch (error) {
      console.error('Error fetching formations:', error);
    }
  };

  const checkAdminRole = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setCheckingPermissions(false);
        return;
      }

      // Use secure RPC function to check admin status
      const { data: isAdminResult, error } = await supabase
        .rpc('is_admin', { user_id: user.id });

      if (error) {
        console.error('Error checking admin role:', error);
        toast.error(t('admin.errors.permissionCheck'));
        setCheckingPermissions(false);
        return;
      }

      setIsAdmin(isAdminResult === true);
      setCheckingPermissions(false);
    } catch (error) {
      console.error('Error checking admin role:', error);
      setCheckingPermissions(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAdmin) {
      toast.error(t('admin.errors.accessDenied'));
      return;
    }

    // Validate form data
    try {
      formationSchema.parse(formData);
    } catch (error: any) {
      toast.error(error.errors?.[0]?.message || t('admin.errors.invalidData'));
      return;
    }

    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error(t('admin.errors.mustBeLoggedIn'));
        return;
      }

      const { error } = await supabase
        .from('formations')
        .insert({
          ...formData,
          is_published: false
        });

      if (error) throw error;

      toast.success(t('admin.success.formationCreated'));
      setFormData({
        title: '',
        description: '',
        price: 0,
        duration: 0,
        level: 'débutant'
      });
    } catch (error) {
      toast.error(t('admin.errors.creationError'));
    } finally {
      setLoading(false);
    }
  };

  const handleVideoUpload = async (file: File, formationId: string) => {
    if (!isAdmin) {
      toast.error(t('admin.errors.videoUploadDenied'));
      return;
    }

    // Validate video file
    try {
      videoFileSchema.parse({ file });
    } catch (error: any) {
      toast.error(error.errors?.[0]?.message || t('admin.errors.invalidVideoFormat'));
      return;
    }

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${formationId}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('formation-videos')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { error: updateError } = await supabase
        .from('formations')
        .update({ video_url: filePath })
        .eq('id', formationId);

      if (updateError) throw updateError;

      toast.success(t('admin.success.videoUploaded'));
    } catch (error) {
      toast.error(t('admin.errors.videoUploadError'));
    }
  };

  const handleThumbnailUpload = async (file: File, formationId: string) => {
    if (!isAdmin) {
      toast.error(t('admin.errors.thumbnailUploadDenied'));
      return;
    }

    // Validate image file
    try {
      imageFileSchema.parse({ file });
    } catch (error: any) {
      toast.error(error.errors?.[0]?.message || t('admin.errors.invalidImageFormat'));
      return;
    }

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${formationId}-thumbnail.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('formation-thumbnails')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('formation-thumbnails')
        .getPublicUrl(filePath);

      const { error: updateError } = await supabase
        .from('formations')
        .update({ thumbnail_url: data.publicUrl })
        .eq('id', formationId);

      if (updateError) throw updateError;

      toast.success(t('admin.success.thumbnailUploaded'));
      fetchFormations(); // Refresh the list
    } catch (error) {
      toast.error(t('admin.errors.thumbnailUploadError'));
    }
  };

  const handleExistingFormationThumbnail = async (e: React.ChangeEvent<HTMLInputElement>, formationId: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    await handleThumbnailUpload(file, formationId);
  };

  if (checkingPermissions) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card className="bg-card/60 backdrop-blur-sm border-cosmic-stellar-gold/20">
          <CardContent className="p-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cosmic-stellar-gold mx-auto mb-4"></div>
              <p className="text-cosmic-star-white/80">{t('admin.checkingPermissions')}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card className="bg-card/60 backdrop-blur-sm border-red-500/20">
          <CardContent className="p-8">
            <div className="text-center">
              <Shield className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-red-500 mb-2">{t('admin.accessDenied')}</h2>
              <p className="text-cosmic-star-white/80 mb-4">
                {t('admin.accessDeniedMessage')}
              </p>
              <p className="text-cosmic-star-white/60 text-sm">
                {t('admin.accessDeniedContact')}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="bg-card/60 backdrop-blur-sm border-cosmic-stellar-gold/20">
        <CardHeader>
          <CardTitle className="cosmic-text text-2xl flex items-center gap-2">
            <Shield className="w-6 h-6 text-cosmic-stellar-gold" />
            {t('admin.createFormation')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">{t('admin.formationTitle')}</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder={t('admin.titlePlaceholder')}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">{t('admin.price')}</Label>
                <Input
                  id="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                  placeholder={t('admin.pricePlaceholder')}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">{t('admin.duration')}</Label>
                <Input
                  id="duration"
                  type="number"
                  min="1"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
                  placeholder={t('admin.durationPlaceholder')}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="level">{t('admin.level')}</Label>
                <Select value={formData.level} onValueChange={(value) => setFormData({ ...formData, level: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="débutant">{t('admin.levels.débutant')}</SelectItem>
                    <SelectItem value="intermédiaire">{t('admin.levels.intermédiaire')}</SelectItem>
                    <SelectItem value="avancé">{t('admin.levels.avancé')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">{t('admin.description')}</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder={t('admin.descriptionPlaceholder')}
                rows={4}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>{t('admin.videoUpload')}</Label>
                <div className="border-2 border-dashed border-cosmic-stellar-gold/30 rounded-lg p-6 text-center hover:border-cosmic-stellar-gold/50 transition-colors">
                  <Video className="w-12 h-12 text-cosmic-stellar-gold mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">
                    {t('admin.dragDropVideo')}
                  </p>
                  <Input
                    type="file"
                    accept="video/*"
                    className="hidden"
                    id="video-upload"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        console.log('Video file selected:', file.name);
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => document.getElementById('video-upload')?.click()}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    {t('admin.chooseVideo')}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>{t('admin.thumbnailUpload')}</Label>
                <div className="border-2 border-dashed border-cosmic-stellar-gold/30 rounded-lg p-6 text-center hover:border-cosmic-stellar-gold/50 transition-colors">
                  <Image className="w-12 h-12 text-cosmic-stellar-gold mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">
                    {t('admin.dragDropImage')}
                  </p>
                  <Input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="thumbnail-upload"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        console.log('Thumbnail file selected:', file.name);
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => document.getElementById('thumbnail-upload')?.click()}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    {t('admin.chooseImage')}
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button type="submit" variant="stellar" disabled={loading} className="flex-1">
                {loading ? t('admin.creating') : t('admin.createButton')}
              </Button>
              <Button type="button" variant="outline" disabled={loading}>
                {t('admin.saveDraft')}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {formations.length > 0 && (
        <Card className="bg-card/60 backdrop-blur-sm border-cosmic-stellar-gold/20 mt-6">
          <CardHeader>
            <CardTitle className="cosmic-text text-2xl flex items-center gap-2">
              <Edit className="w-6 h-6 text-cosmic-stellar-gold" />
              {t('admin.existingFormations')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {formations.map((formation) => (
                <div key={formation.id} className="border border-cosmic-stellar-gold/20 rounded-lg p-4 hover:border-cosmic-stellar-gold/40 transition-colors">
                  <div className="flex items-start gap-4">
                    {formation.thumbnail_url ? (
                      <img src={formation.thumbnail_url} alt={formation.title} className="w-24 h-24 object-cover rounded-lg" />
                    ) : (
                      <div className="w-24 h-24 bg-cosmic-deep-purple/30 rounded-lg flex items-center justify-center">
                        <Image className="w-8 h-8 text-cosmic-stellar-gold/50" />
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="font-semibold text-cosmic-star-white mb-1">{formation.title}</h3>
                      <p className="text-sm text-cosmic-star-white/60 mb-2">{formation.description}</p>
                      <div className="flex items-center gap-2">
                        <Input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          id={`thumbnail-${formation.id}`}
                          onChange={(e) => handleExistingFormationThumbnail(e, formation.id)}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => document.getElementById(`thumbnail-${formation.id}`)?.click()}
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          {formation.thumbnail_url ? t('admin.changeThumbnail') : t('admin.addThumbnail')}
                        </Button>
                        <span className={`text-xs px-2 py-1 rounded ${formation.is_published ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                          {formation.is_published ? t('admin.published') : t('admin.draft')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FormationUpload;