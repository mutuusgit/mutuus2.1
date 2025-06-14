
import React, { useState } from 'react';
import { Calendar, CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface CreateProjectModalProps {
  onSubmit: (projectData: any) => void;
}

export const CreateProjectModal = ({ onSubmit }: CreateProjectModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    due_date: null as Date | null,
  });

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      alert('Projektname ist erforderlich');
      return;
    }

    const projectData = {
      name: formData.name.trim(),
      description: formData.description.trim(),
      due_date: formData.due_date ? formData.due_date.toISOString().split('T')[0] : null,
    };

    onSubmit(projectData);
    
    // Reset form
    setFormData({
      name: '',
      description: '',
      due_date: null,
    });
  };

  const handleInputChange = (field: string, value: string | Date | null) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <DialogContent className="sm:max-w-md bg-gray-800 border-gray-700">
      <DialogHeader>
        <DialogTitle className="text-xl font-semibold text-white">Neues Projekt erstellen</DialogTitle>
      </DialogHeader>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Project Name */}
        <div className="space-y-2">
          <Label htmlFor="project-name" className="text-sm font-medium text-gray-300">
            Projektname *
          </Label>
          <Input
            id="project-name"
            placeholder="z.B. Website Redesign"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            required
            className="w-full bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500"
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="project-description" className="text-sm font-medium text-gray-300">
            Beschreibung
          </Label>
          <Textarea
            id="project-description"
            placeholder="Kurze Beschreibung des Projekts..."
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            rows={3}
            className="w-full resize-none bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500"
          />
        </div>

        {/* Due Date */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-300">Fälligkeitsdatum</Label>
          <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal bg-gray-700 border-gray-600 hover:bg-gray-600",
                  !formData.due_date ? "text-gray-400" : "text-white"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formData.due_date ? (
                  format(formData.due_date, "dd.MM.yyyy", { locale: de })
                ) : (
                  <span>Datum auswählen</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-gray-800 border-gray-700" align="start">
              <CalendarComponent
                mode="single"
                selected={formData.due_date || undefined}
                onSelect={(date) => {
                  handleInputChange('due_date', date || null);
                  setIsCalendarOpen(false);
                }}
                disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                initialFocus
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Submit Buttons */}
        <div className="flex gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            className="flex-1 bg-transparent border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
            onClick={() => {
              setFormData({ name: '', description: '', due_date: null });
            }}
          >
            Abbrechen
          </Button>
          <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">
            Projekt erstellen
          </Button>
        </div>
      </form>
    </DialogContent>
  );
};
