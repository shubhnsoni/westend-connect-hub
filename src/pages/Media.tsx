import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import SEO from "@/components/SEO";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, Share2, ArrowRight, X, ChevronLeft, ChevronRight, Download, Video } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePageContent } from "@/hooks/usePageContent";
import { useTranslation } from "@/hooks/useTranslation";

const Media = () => {
  const { getContent } = usePageContent("media");
  const { t } = useTranslation();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const { data: mediaItems = [], isLoading } = useQuery({
    queryKey: ['media-gallery'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('media_library')
        .select('*')
        .like('file_type', 'image/%')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    },
  });

  const { data: videoItems = [], isLoading: videosLoading } = useQuery({
    queryKey: ['media-videos'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('media_library')
        .select('*')
        .like('file_type', 'video/%')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    },
  });

  const allTags = Array.from(new Set(mediaItems.flatMap((item) => item.tags || []))).sort();
  const filteredItems = selectedTag ? mediaItems.filter((item) => item.tags?.includes(selectedTag)) : mediaItems;

  const openLightbox = (index: number) => { setCurrentIndex(index); setLightboxOpen(true); };
  const navigateLightbox = (direction: 'prev' | 'next') => {
    setCurrentIndex((prev) => direction === 'next' ? (prev + 1) % filteredItems.length : (prev - 1 + filteredItems.length) % filteredItems.length);
  };
  const currentItem = filteredItems[currentIndex];

  const isEmbedUrl = (url: string) => url.includes('youtube.com') || url.includes('youtu.be') || url.includes('vimeo.com');
  const getEmbedUrl = (url: string) => {
    if (url.includes('youtube.com/watch')) return url.replace('watch?v=', 'embed/');
    if (url.includes('youtu.be/')) return url.replace('youtu.be/', 'www.youtube.com/embed/');
    if (url.includes('vimeo.com/')) return url.replace('vimeo.com/', 'player.vimeo.com/video/');
    return url;
  };

  return (
    <>
      <SEO title="Media Gallery - WECA" description="Explore photos and videos from the West End community." keywords="photos, videos, community gallery, WECA events, West End" canonicalUrl="https://westendrockvillemd.org/media" />
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="pt-20" />

        <section className="bg-gradient-to-br from-primary/10 via-background to-muted/20 py-16">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">{getContent('hero_title', 'Media Gallery')}</h1>
            <p className="text-lg text-muted-foreground">{getContent('hero_subtitle', 'Experience the West End through photos and videos from our community')}</p>
          </div>
        </section>

        <main className="flex-1 py-12 bg-background">
          <div className="container mx-auto px-4 max-w-6xl">
            <Tabs defaultValue="photos">
              <TabsList className="mb-8 mx-auto flex w-fit">
                <TabsTrigger value="photos" className="flex items-center gap-2"><Camera className="w-4 h-4" /> {t("Photos")}</TabsTrigger>
                <TabsTrigger value="videos" className="flex items-center gap-2"><Video className="w-4 h-4" /> {t("Videos")}</TabsTrigger>
              </TabsList>

              <TabsContent value="photos">
                {allTags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-8 justify-center">
                    <Badge variant={selectedTag === null ? "default" : "outline"} className="cursor-pointer text-sm px-4 py-1.5" onClick={() => setSelectedTag(null)}>{t("All")}</Badge>
                    {allTags.map((tag) => (
                      <Badge key={tag} variant={selectedTag === tag ? "default" : "outline"} className="cursor-pointer text-sm px-4 py-1.5" onClick={() => setSelectedTag(tag)}>{tag}</Badge>
                    ))}
                  </div>
                )}

                {isLoading ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {Array.from({ length: 8 }).map((_, i) => (<div key={i} className="aspect-square bg-muted rounded-lg animate-pulse" />))}
                  </div>
                ) : filteredItems.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredItems.map((item, index) => (
                      <div key={item.id} className="aspect-square relative overflow-hidden rounded-lg group cursor-pointer border border-border hover:shadow-lg transition-all" onClick={() => openLightbox(index)}>
                        <img src={item.file_url} alt={item.alt_text || item.filename} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-colors flex items-end">
                          <div className="p-3 w-full opacity-0 group-hover:opacity-100 transition-opacity">
                            <p className="text-primary-foreground text-sm font-medium truncate">{item.alt_text || item.filename}</p>
                            {item.tags && item.tags.length > 0 && (
                              <div className="flex gap-1 mt-1 flex-wrap">
                                {item.tags.slice(0, 2).map((tag) => (<span key={tag} className="text-xs bg-primary-foreground/20 text-primary-foreground px-2 py-0.5 rounded-full">{tag}</span>))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <Card className="max-w-lg mx-auto">
                    <CardContent className="text-center py-16">
                      <Camera className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="text-xl font-bold text-foreground mb-2">{t("No Photos Yet")}</h3>
                      <p className="text-muted-foreground">Photos from community events will appear here once uploaded.</p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="videos">
                {videosLoading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Array.from({ length: 4 }).map((_, i) => (<div key={i} className="aspect-video bg-muted rounded-lg animate-pulse" />))}
                  </div>
                ) : videoItems.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {videoItems.map((item) => (
                      <div key={item.id} className="rounded-lg overflow-hidden border border-border">
                        {isEmbedUrl(item.file_url) ? (
                          <iframe src={getEmbedUrl(item.file_url)} className="w-full aspect-video" allowFullScreen title={item.alt_text || item.filename} loading="lazy" />
                        ) : (
                          <video controls className="w-full aspect-video bg-foreground/5" preload="metadata">
                            <source src={item.file_url} type={item.file_type} />
                            Your browser does not support video playback.
                          </video>
                        )}
                        <div className="p-3">
                          <p className="font-medium text-foreground text-sm">{item.alt_text || item.filename}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <Card className="max-w-lg mx-auto">
                    <CardContent className="text-center py-16">
                      <Video className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="text-xl font-bold text-foreground mb-2">{t("No Videos Yet")}</h3>
                      <p className="text-muted-foreground">Videos from community events will appear here once uploaded.</p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            </Tabs>

            {/* Share Section */}
            <Card className="mt-16 bg-gradient-to-br from-secondary/5 to-accent/5 border-secondary/20">
              <CardContent className="pt-12 pb-12 text-center">
                <Share2 className="w-12 h-12 text-secondary mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-foreground mb-4">{getContent('share_title', 'Share Your Stories')}</h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">{getContent('share_description', 'Have photos or videos from West End events? We\'d love to feature them!')}</p>
                <Button size="lg" asChild>
                  <a href={`mailto:${getContent('share_cta_email', 'WECAoutreach@gmail.com')}?subject=Media Submission`}>{getContent('share_cta_label', 'Submit Media')} <ArrowRight className="ml-2 w-5 h-5" /></a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>

        {/* Lightbox */}
        <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
          <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 bg-foreground/95 border-none [&>button]:hidden">
            {currentItem && (
              <div className="relative flex flex-col items-center justify-center h-[90vh]">
                <button onClick={() => setLightboxOpen(false)} className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/20 hover:bg-background/40 transition-colors" aria-label="Close lightbox">
                  <X className="w-6 h-6 text-primary-foreground" />
                </button>
                {filteredItems.length > 1 && (
                  <>
                    <button onClick={() => navigateLightbox('prev')} className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-background/20 hover:bg-background/40 transition-colors" aria-label="Previous image"><ChevronLeft className="w-8 h-8 text-primary-foreground" /></button>
                    <button onClick={() => navigateLightbox('next')} className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-background/20 hover:bg-background/40 transition-colors" aria-label="Next image"><ChevronRight className="w-8 h-8 text-primary-foreground" /></button>
                  </>
                )}
                <img src={currentItem.file_url} alt={currentItem.alt_text || currentItem.filename} className="max-w-full max-h-[80vh] object-contain rounded" />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-foreground/80 to-transparent">
                  <div className="flex items-center justify-between max-w-4xl mx-auto">
                    <div>
                      <p className="text-primary-foreground font-medium">{currentItem.alt_text || currentItem.filename}</p>
                      <p className="text-primary-foreground/60 text-sm">{currentIndex + 1} of {filteredItems.length}</p>
                    </div>
                    <a href={currentItem.file_url} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-background/20 hover:bg-background/40 transition-colors" aria-label="Download image">
                      <Download className="w-5 h-5 text-primary-foreground" />
                    </a>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        <section className="py-24 bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-primary-foreground">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">{getContent('bottom_cta_title', 'Stay Updated')}</h2>
            <p className="text-xl mb-8 text-primary-foreground/90">{getContent('bottom_cta_description', 'Subscribe to receive updates about new photos, videos, and community content')}</p>
            <Button variant="secondary" size="lg" className="rounded-full px-8 text-base shadow-lg" asChild>
              <Link to="/">Join Our Newsletter <ArrowRight className="ml-2 w-5 h-5" /></Link>
            </Button>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Media;
