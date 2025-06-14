
import React, { useState } from 'react';
import { X, Lightbulb, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface TutorialHintProps {
  title: string;
  description: string;
  tutorialLink?: string;
  tips?: string[];
  onDismiss?: () => void;
}

export const TutorialHint: React.FC<TutorialHintProps> = ({
  title,
  description,
  tutorialLink,
  tips = [],
  onDismiss
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate();

  const handleDismiss = () => {
    setIsVisible(false);
    if (onDismiss) {
      onDismiss();
    }
  };

  const handleLearnMore = () => {
    if (tutorialLink) {
      navigate(tutorialLink);
    } else {
      navigate('/tutorial');
    }
  };

  if (!isVisible) return null;

  return (
    <Card className="bg-gradient-to-r from-blue-900 to-purple-900 border-blue-700 mb-6 animate-fade-in">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center mb-2">
              <Lightbulb className="w-5 h-5 text-yellow-400 mr-2" />
              <h3 className="text-white font-semibold">{title}</h3>
            </div>
            
            <p className="text-gray-300 text-sm mb-3">{description}</p>
            
            {tips.length > 0 && (
              <ul className="space-y-1 mb-4">
                {tips.map((tip, index) => (
                  <li key={index} className="text-gray-400 text-xs flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    {tip}
                  </li>
                ))}
              </ul>
            )}
            
            <Button 
              size="sm" 
              onClick={handleLearnMore}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Mehr erfahren
              <ArrowRight className="w-3 h-3 ml-1" />
            </Button>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDismiss}
            className="text-gray-400 hover:text-white p-1 ml-4"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
