
import React, { useState } from 'react';
import { Calendar, CalendarIcon, MapPin, Clock, Euro, Heart, Upload } from 'lucide-react';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface CreateJobModalProps {
  onSubmit: (jobData: any) => void;
}

export const CreateJobModal = ({ onSubmit }: CreateJobModalProps) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    job_type: '',
    budget: '',
    karma_reward: 30,
    location: '',
    estimated_duration: '',
    due_date: null as Date | null,
    requirements: [] as string[],
  });

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const categories = [
    { value: 'haushalt', label: 'Haushalt', icon: '🏠' },
    { value: 'garten', label: 'Garten', icon: '🌿' },
    { value: 'einkaufen', label: 'Einkaufen', icon: '🛒' },
    { value: 'transport', label: 'Transport', icon: '🚗' },
    { value: 'technik', label: 'Technik', icon: '💻' },
    { value: 'haustiere', label: 'Haustiere', icon: '🐕' },
    { value: 'betreuung', label: 'Betreuung', icon: '👥' },
    { value: 'handwerk', label: 'Handwerk', icon: '🔨' },
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.category || !formData.job_type) {
      alert('Bitte füllen Sie alle erforderlichen Felder aus');
      return;
    }

    const jobData = {
      ...formData,
      title: formData.title.trim(),
      description: formData.description.trim(),
      budget: formData.job_type === 'kein_bock' ? parseFloat(formData.budget) : null,
      karma_reward: formData.job_type === 'good_deeds' ? formData.karma_reward : 0,
      due_date: formData.due_date ? formData.due_date.toISOString().split('T')[0] : null,
      estimated_duration: parseInt(formData.estimated_duration) || null,
    };

    onSubmit(jobData);
    
    // Reset form
    setFormData({
      title: '',
      description: '',
      category: '',
      job_type: '',
      budget: '',
      karma_reward: 30,
      location: '',
      estimated_duration: '',
      due_date: null,
      requirements: [],
    });
    setStep(1);
  };

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <DialogContent className="sm:max-w-2xl bg-gray-800 border-gray-700 max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="text-xl font-semibold text-white">
          Neuen Job erstellen - Schritt {step} von 3
        </DialogTitle>
      </DialogHeader>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Step 1: Basic Info */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="job-title" className="text-sm font-medium text-gray-300">
                Job-Titel *
              </Label>
              <Input
                id="job-title"
                placeholder="z.B. Garten umgraben oder Einkaufen für Senioren"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                required
                className="w-full bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-300">Kategorie *</Label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {categories.map((category) => (
                  <button
                    key={category.value}
                    type="button"
                    onClick={() => handleInputChange('category', category.value)}
                    className={cn(
                      "p-3 rounded-lg border text-center transition-colors",
                      formData.category === category.value
                        ? "bg-blue-600 border-blue-500 text-white"
                        : "bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600"
                    )}
                  >
                    <div className="text-2xl mb-1">{category.icon}</div>
                    <div className="text-xs font-medium">{category.label}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-300">Job-Typ *</Label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => handleInputChange('job_type', 'good_deeds')}
                  className={cn(
                    "p-4 rounded-lg border text-left transition-colors",
                    formData.job_type === 'good_deeds'
                      ? "bg-green-600 border-green-500 text-white"
                      : "bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600"
                  )}
                >
                  <div className="flex items-center mb-2">
                    <Heart className="w-5 h-5 mr-2" />
                    <span className="font-medium">Good Deed</span>
                  </div>
                  <p className="text-sm opacity-90">Freiwillige Hilfe für Karma-Punkte</p>
                </button>

                <button
                  type="button"
                  onClick={() => handleInputChange('job_type', 'kein_bock')}
                  className={cn(
                    "p-4 rounded-lg border text-left transition-colors",
                    formData.job_type === 'kein_bock'
                      ? "bg-blue-600 border-blue-500 text-white"
                      : "bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600"
                  )}
                >
                  <div className="flex items-center mb-2">
                    <Euro className="w-5 h-5 mr-2" />
                    <span className="font-medium">KeinBock</span>
                  </div>
                  <p className="text-sm opacity-90">Bezahlter Mini-Job</p>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Details */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="job-description" className="text-sm font-medium text-gray-300">
                Beschreibung
              </Label>
              <Textarea
                id="job-description"
                placeholder="Beschreiben Sie die Aufgabe detailliert..."
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={4}
                className="w-full resize-none bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="job-location" className="text-sm font-medium text-gray-300">
                Standort *
              </Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="job-location"
                  placeholder="z.B. Neuss, Deutschland"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  required
                  className="pl-10 bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="estimated-duration" className="text-sm font-medium text-gray-300">
                  Geschätzte Dauer (Minuten)
                </Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="estimated-duration"
                    type="number"
                    placeholder="120"
                    value={formData.estimated_duration}
                    onChange={(e) => handleInputChange('estimated_duration', e.target.value)}
                    className="pl-10 bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                  />
                </div>
              </div>

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
                        <span>Datum wählen</span>
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
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Budget/Karma */}
        {step === 3 && (
          <div className="space-y-6">
            {formData.job_type === 'kein_bock' && (
              <div className="space-y-2">
                <Label htmlFor="budget" className="text-sm font-medium text-gray-300">
                  Budget (€) *
                </Label>
                <div className="relative">
                  <Euro className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="budget"
                    type="number"
                    placeholder="45"
                    value={formData.budget}
                    onChange={(e) => handleInputChange('budget', e.target.value)}
                    required={formData.job_type === 'kein_bock'}
                    className="pl-10 bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                  />
                </div>
                <p className="text-xs text-gray-400">
                  Inklusive 10% Plattformgebühr. Sie zahlen {formData.budget && !isNaN(parseFloat(formData.budget)) ? (parseFloat(formData.budget) * 1.1).toFixed(2) : '0'}€
                </p>
              </div>
            )}

            {formData.job_type === 'good_deeds' && (
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-300">
                  Karma-Belohnung
                </Label>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-green-400 font-medium">Karma-Punkte</span>
                    <span className="text-green-400 font-bold">{formData.karma_reward}</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    step="10"
                    value={formData.karma_reward}
                    onChange={(e) => handleInputChange('karma_reward', parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>10</span>
                    <span>100</span>
                  </div>
                </div>
                <p className="text-xs text-gray-400">
                  Höhere Karma-Belohnung zieht mehr Helfer an
                </p>
              </div>
            )}

            <div className="bg-gray-700 p-4 rounded-lg">
              <h4 className="text-white font-medium mb-2">Zusammenfassung</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Titel:</span>
                  <span className="text-white">{formData.title || 'Nicht ausgefüllt'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Kategorie:</span>
                  <span className="text-white">
                    {categories.find(c => c.value === formData.category)?.label || 'Nicht ausgewählt'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Typ:</span>
                  <span className="text-white">
                    {formData.job_type === 'good_deeds' ? 'Good Deed' : 
                     formData.job_type === 'kein_bock' ? 'KeinBock' : 'Nicht ausgewählt'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Belohnung:</span>
                  <span className="text-white">
                    {formData.job_type === 'good_deeds' ? `${formData.karma_reward} Karma` :
                     formData.job_type === 'kein_bock' ? `${formData.budget}€` : '-'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex gap-3 pt-4 border-t border-gray-700">
          {step > 1 && (
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              className="flex-1 bg-transparent border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              Zurück
            </Button>
          )}
          
          {step < 3 ? (
            <Button
              type="button"
              onClick={nextStep}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
              disabled={
                (step === 1 && (!formData.title || !formData.category || !formData.job_type)) ||
                (step === 2 && !formData.location)
              }
            >
              Weiter
            </Button>
          ) : (
            <Button 
              type="submit" 
              className="flex-1 bg-blue-600 hover:bg-blue-700"
              disabled={
                !formData.title || !formData.category || !formData.job_type || !formData.location ||
                (formData.job_type === 'kein_bock' && !formData.budget)
              }
            >
              Job erstellen
            </Button>
          )}
        </div>
      </form>
    </DialogContent>
  );
};
