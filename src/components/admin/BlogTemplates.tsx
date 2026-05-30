import { FileText, Calendar, Megaphone, Newspaper, AlertTriangle, Layout, BookOpen, FileCheck, Bell, ChevronDown, Maximize2, Minimize2, Clock, Type } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useState, useMemo } from 'react';

// ============================================
// LAYOUT STYLES - Visual formatting only
// ============================================

export interface LayoutStyle {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  previewClass: string;
}

export const layoutStyles: LayoutStyle[] = [
  {
    id: 'classic',
    name: 'Classic Clean',
    description: 'Elegant minimalism with drop caps, refined typography, and subtle dividers',
    icon: <FileText className="h-4 w-4" />,
    previewClass: 'layout-classic',
  },
  {
    id: 'modern-cards',
    name: 'Modern Cards',
    description: 'Polished cards with gradient accents, hover effects, and enhanced shadows',
    icon: <Layout className="h-4 w-4" />,
    previewClass: 'layout-modern-cards',
  },
  {
    id: 'magazine',
    name: 'Magazine Style',
    description: 'Editorial styling with decorative drop caps and oversized pull quotes',
    icon: <BookOpen className="h-4 w-4" />,
    previewClass: 'layout-magazine',
  },
  {
    id: 'official',
    name: 'Official Document',
    description: 'Formal document format with letterhead, numbered sections, and justified text',
    icon: <FileCheck className="h-4 w-4" />,
    previewClass: 'layout-official',
  },
  {
    id: 'alert',
    name: 'Alert/Urgent',
    description: 'High-impact alerts with warning stripes, pulsing border, and action badges',
    icon: <Bell className="h-4 w-4" />,
    previewClass: 'layout-alert',
  }
];

export function getLayoutStyleById(id: string): LayoutStyle | undefined {
  return layoutStyles.find(s => s.id === id);
}

// ============================================
// CONTENT TEMPLATES - Starting structures
// ============================================

export interface ContentTemplate {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  structure: string;
}

export const contentTemplates: ContentTemplate[] = [
  {
    id: 'standard',
    name: 'Standard Article',
    description: 'Classic blog format with intro, sections, and conclusion',
    icon: <FileText className="h-5 w-5" />,
    structure: `<p class="lead">[Introduction - Your opening paragraph that hooks readers]</p>

<div class="content-section">
  <div class="section-header">Main Section Title</div>
  <p>[Your main content goes here. Expand on your key points with supporting details.]</p>
</div>

<div class="content-section">
  <div class="section-header">Additional Section</div>
  <p>[Continue with more content, examples, or explanations.]</p>
</div>

<blockquote><p>[A key takeaway, quote, or important message for readers to remember]</p></blockquote>

<div class="content-section">
  <div class="section-header">Conclusion</div>
  <p>[Wrap up your article with a summary or call to action.]</p>
</div>`
  },
  {
    id: 'meeting-minutes',
    name: 'Meeting Minutes',
    description: 'Structured format for documenting meeting outcomes',
    icon: <Calendar className="h-5 w-5" />,
    structure: `<div class="info-card">
  <div class="info-card-header">Meeting Details</div>
  <div class="info-card-content">
    <p><strong>Date:</strong> [Meeting Date]</p>
    <p><strong>Location:</strong> [Meeting Location or "Virtual via Zoom"]</p>
    <p><strong>Attendees:</strong> [Number of attendees or key participants]</p>
  </div>
</div>

<div class="content-section">
  <div class="section-header">Summary</div>
  <p>[Brief overview of what was discussed and accomplished during the meeting.]</p>
</div>

<div class="content-section">
  <div class="section-header">Key Decisions</div>
  <ul>
    <li>[Decision or action item 1]</li>
    <li>[Decision or action item 2]</li>
    <li>[Decision or action item 3]</li>
  </ul>
</div>

<div class="content-section">
  <div class="section-header">Discussion Topics</div>
  <p>[Detailed notes on major topics discussed.]</p>
</div>

<div class="content-section">
  <div class="section-header">Next Steps</div>
  <ul>
    <li>[Action item with responsible party]</li>
    <li>[Upcoming deadline or milestone]</li>
  </ul>
</div>

<div class="download-link">
  <a href="[PDF_URL]" target="_blank" rel="noopener noreferrer">📄 Download Official Meeting Minutes (PDF)</a>
</div>`
  },
  {
    id: 'event-announcement',
    name: 'Event Announcement',
    description: 'Promote upcoming community events and activities',
    icon: <Megaphone className="h-5 w-5" />,
    structure: `<div class="info-card accent">
  <div class="info-card-header">Event Details</div>
  <div class="info-card-content">
    <p><strong>🎉 Event:</strong> [Event Name]</p>
    <p><strong>📅 Date:</strong> [Date and Time]</p>
    <p><strong>📍 Location:</strong> [Venue Address]</p>
    <p><strong>💵 Cost:</strong> [Free / Ticket Price]</p>
  </div>
</div>

<div class="content-section">
  <div class="section-header">About This Event</div>
  <p>[Describe the event, its purpose, and why community members should attend.]</p>
</div>

<div class="content-section">
  <div class="section-header">What to Expect</div>
  <ul>
    <li>[Activity, feature, or highlight 1]</li>
    <li>[Activity, feature, or highlight 2]</li>
    <li>[Activity, feature, or highlight 3]</li>
  </ul>
</div>

<div class="content-section">
  <div class="section-header">How to Participate</div>
  <p>[Registration instructions, RSVP requirements, or drop-in details.]</p>
</div>

<blockquote><p>Questions? Contact us at [contact email or phone].</p></blockquote>`
  },
  {
    id: 'community-update',
    name: 'Community Update',
    description: 'Newsletter-style updates for neighborhood news',
    icon: <Newspaper className="h-5 w-5" />,
    structure: `<p class="lead">[Brief 1-2 sentence summary of the most important update.]</p>

<div class="content-section">
  <div class="section-header">What's Happening</div>
  <p>[Main news content - what residents need to know about current developments, projects, or changes in the neighborhood.]</p>
</div>

<div class="content-section">
  <div class="section-header">Important Dates</div>
  <ul>
    <li><strong>[Date 1]:</strong> [Event or deadline]</li>
    <li><strong>[Date 2]:</strong> [Event or deadline]</li>
    <li><strong>[Date 3]:</strong> [Event or deadline]</li>
  </ul>
</div>

<div class="content-section">
  <div class="section-header">Community Spotlight</div>
  <p>[Highlight a local business, volunteer, or positive neighborhood story.]</p>
</div>

<div class="content-section">
  <div class="section-header">Get Involved</div>
  <p>[Call to action - how residents can participate, volunteer, or provide feedback.]</p>
</div>`
  },
  {
    id: 'urgent-alert',
    name: 'Urgent Alert',
    description: 'Time-sensitive notices requiring immediate attention',
    icon: <AlertTriangle className="h-5 w-5" />,
    structure: `<div class="info-card warning">
  <div class="info-card-header">⚠️ Alert Information</div>
  <div class="info-card-content">
    <p><strong>Alert Type:</strong> [Type of Alert - Safety, Weather, Traffic, etc.]</p>
    <p><strong>Effective:</strong> [Start Date] to [End Date]</p>
    <p><strong>Affected Area:</strong> [Streets or areas impacted]</p>
  </div>
</div>

<div class="content-section">
  <div class="section-header">What You Need to Know</div>
  <p>[Clear, concise explanation of the situation and why it matters to residents.]</p>
</div>

<div class="content-section">
  <div class="section-header">Action Required</div>
  <ul>
    <li>[Specific step residents should take]</li>
    <li>[Another action or precaution]</li>
    <li>[Additional guidance if applicable]</li>
  </ul>
</div>

<div class="content-section">
  <div class="section-header">Updates</div>
  <p>[How and where residents can get the latest information.]</p>
</div>

<div class="content-section">
  <div class="section-header">Questions?</div>
  <p>Contact [relevant authority/department] at [phone/email] for more information.</p>
</div>`
  }
];

export function getTemplateById(id: string): ContentTemplate | undefined {
  return contentTemplates.find(t => t.id === id);
}

// ============================================
// LAYOUT STYLE SELECTOR COMPONENT
// ============================================

interface LayoutStyleSelectorProps {
  selectedStyle: string;
  onSelectStyle: (id: string) => void;
}

export function LayoutStyleSelector({ selectedStyle, onSelectStyle }: LayoutStyleSelectorProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-foreground">Layout Style</h3>
      <div className="flex flex-wrap gap-2">
        {layoutStyles.map((style) => (
          <button
            key={style.id}
            type="button"
            onClick={() => onSelectStyle(style.id)}
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-lg border-2 transition-all text-sm",
              selectedStyle === style.id
                ? "border-primary bg-primary/10 text-primary"
                : "border-border bg-card hover:border-primary/50 text-muted-foreground hover:text-foreground"
            )}
          >
            {style.icon}
            <span className="font-medium">{style.name}</span>
          </button>
        ))}
      </div>
      <p className="text-xs text-muted-foreground">
        {layoutStyles.find(s => s.id === selectedStyle)?.description}
      </p>
    </div>
  );
}

// ============================================
// CONTENT TEMPLATE DRAWER COMPONENT
// ============================================

interface ContentTemplateDrawerProps {
  selectedTemplate: string;
  onSelectTemplate: (id: string) => void;
  onApplyTemplate: () => void;
  hasContent: boolean;
}

export function ContentTemplateDrawer({
  selectedTemplate,
  onSelectTemplate,
  onApplyTemplate,
  hasContent
}: ContentTemplateDrawerProps) {
  const [isOpen, setIsOpen] = useState(!hasContent);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="border rounded-lg bg-muted/30">
      <CollapsibleTrigger asChild>
        <button
          type="button"
          className="flex items-center justify-between w-full px-4 py-3 text-left hover:bg-muted/50 transition-colors rounded-lg"
        >
          <span className="text-sm font-medium">
            {hasContent ? "📝 Want a different structure? Apply a template" : "📝 Need a structure? Start with a template"}
          </span>
          <ChevronDown className={cn(
            "h-4 w-4 text-muted-foreground transition-transform",
            isOpen && "rotate-180"
          )} />
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent className="px-4 pb-4">
        <div className="space-y-3 pt-2">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
            {contentTemplates.map((template) => (
              <button
                key={template.id}
                type="button"
                onClick={() => onSelectTemplate(template.id)}
                className={cn(
                  "flex flex-col items-center gap-1.5 p-3 rounded-lg border-2 transition-all text-center",
                  selectedTemplate === template.id
                    ? "border-primary bg-primary/10"
                    : "border-border bg-card hover:border-primary/50"
                )}
              >
                <div className={cn(
                  "p-2 rounded-md",
                  selectedTemplate === template.id ? "bg-primary text-primary-foreground" : "bg-muted"
                )}>
                  {template.icon}
                </div>
                <span className="text-xs font-medium">{template.name}</span>
              </button>
            ))}
          </div>
          
          {selectedTemplate && (
            <div className="flex items-center justify-between pt-2 border-t">
              <p className="text-xs text-muted-foreground">
                {contentTemplates.find(t => t.id === selectedTemplate)?.description}
              </p>
              <Button
                type="button"
                size="sm"
                onClick={onApplyTemplate}
              >
                {hasContent ? "Replace Content" : "Use Template"}
              </Button>
            </div>
          )}
          
          {hasContent && (
            <p className="text-xs text-amber-600 dark:text-amber-400">
              ⚠️ Applying a template will replace your current content.
            </p>
          )}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

// ============================================
// STYLED PREVIEW COMPONENT
// ============================================

interface StyledPreviewProps {
  title: string;
  content: string;
  layoutStyle: string;
}

function getReadingStats(content: string) {
  const text = content.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  const words = text ? text.split(' ').length : 0;
  const minutes = Math.max(1, Math.ceil(words / 230));
  return { words, minutes };
}

export function StyledPreview({ title, content, layoutStyle }: StyledPreviewProps) {
  const style = getLayoutStyleById(layoutStyle);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const stats = useMemo(() => getReadingStats(content), [content]);
  
  const previewContent = (
    <div className={cn(
      "border rounded-lg bg-card min-h-[300px] transition-all duration-300 relative",
      style?.previewClass,
      isFullscreen ? "p-8 md:p-12" : "p-6"
    )}>
      {title && (
        <h1 className="text-2xl font-bold mb-4">{title}</h1>
      )}
      {content ? (
        <div 
          className="newsletter-content prose prose-sm max-w-none"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      ) : (
        <p className="text-muted-foreground italic">
          Start writing content to see a preview...
        </p>
      )}
    </div>
  );

  if (isFullscreen) {
    return (
      <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm overflow-auto animate-fade-in">
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-3 bg-background/90 backdrop-blur border-b">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-foreground">{style?.name} Preview</span>
            {content && (
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{stats.minutes} min read</span>
                <span className="flex items-center gap-1"><Type className="h-3 w-3" />{stats.words.toLocaleString()} words</span>
              </div>
            )}
          </div>
          <Button variant="ghost" size="sm" onClick={() => setIsFullscreen(false)}>
            <Minimize2 className="h-4 w-4 mr-1" /> Exit
          </Button>
        </div>
        <div className="max-w-3xl mx-auto py-8 px-4">
          {previewContent}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Preview header bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {content && (
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1 bg-muted px-2 py-1 rounded-full">
                <Clock className="h-3 w-3" />{stats.minutes} min read
              </span>
              <span className="flex items-center gap-1 bg-muted px-2 py-1 rounded-full">
                <Type className="h-3 w-3" />{stats.words.toLocaleString()} words
              </span>
            </div>
          )}
        </div>
        <Button variant="ghost" size="sm" onClick={() => setIsFullscreen(true)} className="text-xs">
          <Maximize2 className="h-3.5 w-3.5 mr-1" /> Fullscreen
        </Button>
      </div>
      {previewContent}
    </div>
  );
}

// ============================================
// LEGACY EXPORTS (for backwards compatibility)
// ============================================

// Keep old exports for any existing usages
export const blogTemplates = contentTemplates;

export interface BlogTemplate extends ContentTemplate {}

// Legacy TemplatePreviewSelector (now uses layout styles + templates)
interface TemplatePreviewSelectorProps {
  selectedTemplate: string;
  onSelectTemplate: (id: string) => void;
  onApplyTemplate: () => void;
  title: string;
}

export function TemplatePreviewSelector({ 
  selectedTemplate, 
  onSelectTemplate, 
  onApplyTemplate,
  title
}: TemplatePreviewSelectorProps) {
  const template = getTemplateById(selectedTemplate);
  
  return (
    <div className="space-y-4">
      {/* Template selector pills */}
      <div className="flex flex-wrap gap-2 pb-3 border-b">
        {contentTemplates.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => onSelectTemplate(t.id)}
            className={cn(
              "px-3 py-1.5 rounded-full text-sm font-medium transition-all flex items-center gap-1.5",
              selectedTemplate === t.id
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            )}
          >
            {t.icon}
            {t.name}
          </button>
        ))}
      </div>

      {/* Live preview */}
      <div className="border rounded-lg p-6 bg-card min-h-[300px]">
        {title && (
          <h1 className="text-2xl font-bold mb-4">{title}</h1>
        )}
        {template ? (
          <div 
            className="newsletter-content prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: template.structure }}
          />
        ) : (
          <p className="text-muted-foreground italic">
            Select a template above to preview its formatting...
          </p>
        )}
      </div>

      {/* Apply button */}
      {selectedTemplate && (
        <div className="flex justify-end">
          <Button 
            type="button"
            onClick={onApplyTemplate}
          >
            Use This Template
          </Button>
        </div>
      )}
    </div>
  );
}
