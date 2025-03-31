import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Headphones, BookOpen as Teacher } from "lucide-react";

type StudyMaterial = {
  id: string;
  title: string;
  icon: "text" | "audio" | "study";
  description: string;
  files: {
    name: string;
    format: string;
  }[];
  buttonText: string;
  buttonColor: "primary" | "secondary" | "accent";
};

type StudyMaterialsProps = {
  materials: StudyMaterial[];
};

export default function StudyMaterials({ materials }: StudyMaterialsProps) {
  const getIcon = (iconType: string) => {
    switch (iconType) {
      case "text":
        return <BookOpen className="text-lg" />;
      case "audio":
        return <Headphones className="text-lg" />;
      case "study":
        return <Teacher className="text-lg" />;
      default:
        return <BookOpen className="text-lg" />;
    }
  };

  const getFileIcon = (format: string) => {
    switch (format) {
      case "PDF":
        return <i className="fas fa-file-pdf text-red-500 mr-2"></i>;
      case "MP3":
        return <i className="fas fa-file-audio text-blue-500 mr-2"></i>;
      default:
        return <i className="fas fa-file-alt text-green-500 mr-2"></i>;
    }
  };

  const getButtonColor = (color: string) => {
    switch (color) {
      case "primary":
        return "bg-primary/10 hover:bg-primary/20 text-primary";
      case "secondary":
        return "bg-secondary/10 hover:bg-secondary/20 text-secondary";
      case "accent":
        return "bg-accent/10 hover:bg-accent/20 text-accent";
      default:
        return "bg-primary/10 hover:bg-primary/20 text-primary";
    }
  };

  return (
    <section className="mb-12">
      <h2 className="text-xl font-semibold mb-6 font-lora">
        Study Materials <span className="text-primary">•</span> Free Resources
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {materials.map((material) => (
          <Card
            key={material.id}
            className="bg-surface overflow-hidden hover:shadow-lg transition-all duration-300"
          >
            <CardContent className="p-6">
              <div
                className={`flex items-center justify-center h-12 w-12 rounded-lg bg-${material.buttonColor}/20 text-${material.buttonColor} mb-4`}
              >
                {getIcon(material.icon)}
              </div>
              <h3 className="font-medium text-lg mb-2">{material.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {material.description}
              </p>
              <ul className="text-sm space-y-2 mb-4">
                {material.files.map((file, index) => (
                  <li key={index} className="flex items-center">
                    {getFileIcon(file.format)}
                    <span>
                      {file.name} - {file.format}
                    </span>
                  </li>
                ))}
              </ul>
              <Button
                className={`${getButtonColor(material.buttonColor)} text-sm py-2 px-4 rounded transition w-full`}
              >
                {material.buttonText}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
