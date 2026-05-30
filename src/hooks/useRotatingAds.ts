import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface Ad {
  id: string;
  title: string;
  image_url: string;
  link_url: string | null;
  size: string;
  placement: string;
  is_active: boolean | null;
  display_order: number | null;
}

export const useRotatingAds = (placement: string, rotationInterval = 3000) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const { data: ads = [], isLoading } = useQuery({
    queryKey: ['rotating-ads', placement],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('ads')
        .select('*')
        .eq('placement', placement)
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      if (error) throw error;
      return (data || []) as Ad[];
    },
  });

  useEffect(() => {
    if (ads.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ads.length);
    }, rotationInterval);

    return () => clearInterval(interval);
  }, [ads.length, rotationInterval]);

  return {
    currentAd: ads[currentIndex] || null,
    allAds: ads,
    isLoading,
    currentIndex,
  };
};
