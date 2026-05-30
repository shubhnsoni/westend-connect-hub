import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ChevronLeft, ChevronRight, MapPin, Clock, Download } from "lucide-react";
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, addMonths, subMonths, isSameMonth, isSameDay, isToday } from "date-fns";
import { downloadICS } from "@/lib/generateICS";
import { useTranslation } from "@/hooks/useTranslation";

const parseLocalDate = (dateStr: string) => {
  const { t } = useTranslation();
  const [datePart, timePart] = dateStr.split('T');
  const [year, month, day] = datePart.split('-').map(Number);
  const [hours = 0, minutes = 0] = (timePart || '').split(':').map(Number);
  return new Date(year, month - 1, day, hours, minutes);
};

interface CalendarEvent {
  id: string;
  title: string;
  start_date: string;
  end_date: string | null;
  location: string | null;
  description: string | null;
}

interface EventCalendarProps {
  events: CalendarEvent[];
}

const EventCalendar = ({ events }: EventCalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const days = useMemo(() => {
    const start = startOfWeek(startOfMonth(currentMonth));
    const end = endOfWeek(endOfMonth(currentMonth));
    const result: Date[] = [];
    let day = start;
    while (day <= end) {
      result.push(day);
      day = addDays(day, 1);
    }
    return result;
  }, [currentMonth]);

  const getEventsForDay = (day: Date) =>
    events.filter((e) => isSameDay(parseLocalDate(e.start_date), day));

  return (
    <TooltipProvider>
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" size="icon" onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <h3 className="text-xl font-bold text-foreground">
            {format(currentMonth, "MMMM yyyy")}
          </h3>
          <Button variant="ghost" size="icon" onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>

        <div className="grid grid-cols-7 gap-1">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <div key={d} className="text-center text-xs font-medium text-muted-foreground py-2">{d}</div>
          ))}
          {days.map((day, i) => {
            const dayEvents = getEventsForDay(day);
            const inMonth = isSameMonth(day, currentMonth);
            const today = isToday(day);

            const cell = (
              <div
                className={`relative min-h-[3rem] p-1 rounded-lg text-center text-sm transition-colors
                  ${!inMonth ? "text-muted-foreground/40" : "text-foreground"}
                  ${today ? "bg-primary/10 font-bold" : ""}
                  ${dayEvents.length > 0 ? "cursor-pointer hover:bg-muted" : ""}`}
              >
                <span>{format(day, "d")}</span>
                {dayEvents.length > 0 && (
                  <div className="flex justify-center gap-0.5 mt-1">
                    {dayEvents.slice(0, 3).map((_, idx) => (
                      <span key={idx} className="w-1.5 h-1.5 rounded-full bg-primary" />
                    ))}
                  </div>
                )}
              </div>
            );

            if (dayEvents.length === 0) return <div key={i}>{cell}</div>;

            return (
              <Popover key={i}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <PopoverTrigger asChild>{cell}</PopoverTrigger>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="text-xs max-w-[200px]">
                    {dayEvents.map(ev => ev.title).join(", ")}
                  </TooltipContent>
                </Tooltip>
                <PopoverContent className="w-72 p-4" side="top">
                  <p className="text-sm font-medium text-muted-foreground mb-2">
                    {format(day, "EEEE, MMMM d")}
                  </p>
                  <div className="space-y-3">
                    {dayEvents.map((ev) => (
                      <div key={ev.id} className="border-l-2 border-primary pl-3">
                        <p className="font-semibold text-sm">{ev.title}</p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                          <Clock className="w-3 h-3" />
                          {format(parseLocalDate(ev.start_date), "h:mm a")}
                        </div>
                        {ev.location && (
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <MapPin className="w-3 h-3" />
                            {ev.location}
                          </div>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 text-xs px-2 mt-1"
                          onClick={() => downloadICS({ title: ev.title, description: ev.description || "", startDate: ev.start_date, endDate: ev.end_date || ev.start_date, location: ev.location || "" })}
                        >
                          <Download className="w-3 h-3 mr-1" />
                          Add to Calendar
                        </Button>
                      </div>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            );
          })}
        </div>
      </Card>
    </TooltipProvider>
  );
};

export default EventCalendar;
