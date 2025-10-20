import { useState } from 'react';
import { NeuralNetwork } from '@/components/NeuralNetwork';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, TrendingUp } from 'lucide-react';

const Index = () => {
  const [catalogContent, setCatalogContent] = useState('');
  const [imageLink, setImageLink] = useState('');
  const [prediction, setPrediction] = useState<{
    price: number;
    confidence: number;
  } | null>(null);

  const handlePredict = () => {
    // Simulate prediction - replace with actual ML model integration
    const simulatedPrice = Math.random() * 100 + 20;
    const simulatedConfidence = Math.random() * 20 + 80;
    setPrediction({
      price: parseFloat(simulatedPrice.toFixed(2)),
      confidence: parseFloat(simulatedConfidence.toFixed(2)),
    });
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <NeuralNetwork />
      
      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="text-center mb-12 space-y-6">
          <Badge variant="secondary" className="mb-4 bg-primary/10 border-primary/20">
            <Sparkles className="w-3 h-3 mr-1" />
            <span className="text-purple-900 font-semibold">Powered by Advanced DL Models</span>
          </Badge>
          
          <h1 className="text-6xl font-bold text-foreground mb-4">
            AI Product Price Predictor
          </h1>
          
          <p 
            className="text-xl font-medium max-w-4xl mx-auto"
            style={{
              background: 'linear-gradient(135deg, hsl(280 50% 30%), hsl(320 50% 25%))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Harness the power of CatBoost & XGBoost models with DistilBERT embeddings to predict product prices with{' '}
            <span className="text-accent font-bold">51.82% SMAPE accuracy</span>
          </p>
          
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <span>✨ Trained on 75,000+ products</span>
            <span>•</span>
            <span>Real-time predictions</span>
            <span>•</span>
            <span>Neural network analysis</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          <Card className="p-6 backdrop-blur-sm shadow-xl" style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(243, 232, 255, 0.7))'
          }}>
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-bold">Product Details</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold mb-2">
                  Catalog Content
                </label>
                <Textarea
                  placeholder="Enter product details: name, description, attributes (Gluten-Free, Organic, etc.), pack size, item size in ounces..."
                  value={catalogContent}
                  onChange={(e) => setCatalogContent(e.target.value)}
                  className="min-h-[200px] resize-none font-bold"
                />
                <p className="text-xs text-muted-foreground mt-2 font-bold">
                  Include: Item Name, Description, Bullet Points, Value & Unit, Attributes, Pack Size
                </p>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">
                  Product Image Link
                </label>
                <Input
                  placeholder="https://example.com/product-image.jpg"
                  value={imageLink}
                  onChange={(e) => setImageLink(e.target.value)}
                  className="font-bold"
                />
                <p className="text-xs text-muted-foreground mt-2 font-bold">
                  Paste a direct URL to the product image
                </p>
              </div>

              <Button 
                onClick={handlePredict}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold"
                size="lg"
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                Predict Price
              </Button>
            </div>
          </Card>

          <Card className="p-6 backdrop-blur-sm shadow-xl" style={{
            background: 'linear-gradient(135deg, rgba(253, 242, 248, 0.8), rgba(255, 255, 255, 0.9))'
          }}>
            <h2 className="text-2xl font-bold mb-6">
              {prediction ? 'Price Prediction' : 'Awaiting Prediction'}
            </h2>
            
            {prediction ? (
              <div className="space-y-6">
                <div className="text-center p-8 bg-primary/5 rounded-lg border border-primary/20">
                  <div className="text-6xl font-bold text-primary mb-2">
                    ${prediction.price}
                  </div>
                  <p className="text-sm text-muted-foreground font-bold">Predicted Price</p>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-muted/50 rounded-lg">
                    <span className="text-sm font-bold">Model Confidence</span>
                    <span className="text-lg font-bold text-primary">{prediction.confidence}%</span>
                  </div>

                  <div className="flex justify-between items-center p-4 bg-muted/50 rounded-lg">
                    <span className="text-sm font-bold">Price Range</span>
                    <span className="text-sm font-bold">
                      ${(prediction.price * 0.9).toFixed(2)} - ${(prediction.price * 1.1).toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-4 bg-muted/50 rounded-lg">
                    <span className="text-sm font-bold">Market Position</span>
                    <Badge variant="secondary" className="font-bold">Competitive</Badge>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-[400px] text-center">
                <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <TrendingUp className="w-16 h-16 text-primary/40" />
                </div>
                <p className="text-muted-foreground max-w-sm font-bold">
                  Enter product details and click "Predict Price" to see AI-powered pricing
                </p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
