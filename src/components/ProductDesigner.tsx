import React, { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface DesignElement {
  id: string;
  type: 'image' | 'text';
  content: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  color?: string;
  fontSize?: number;
  fontFamily?: string;
}

interface ProductDesignerProps {
  productType: 'mug' | 'tshirt';
  trigger: React.ReactNode;
}

const ProductDesigner: React.FC<ProductDesignerProps> = ({ productType, trigger }) => {
  const [elements, setElements] = useState<DesignElement[]>([]);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [draggedElement, setDraggedElement] = useState<string | null>(null);
  const [productSize, setProductSize] = useState(productType === 'mug' ? 'standard' : 'M');
  const [productColor, setProductColor] = useState('white');
  const [textInput, setTextInput] = useState('');
  const [currentPrice, setCurrentPrice] = useState(productType === 'mug' ? 350 : 450);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const productSizes = {
    mug: { standard: '350мл', large: '500мл' },
    tshirt: { XS: 'XS', S: 'S', M: 'M', L: 'L', XL: 'XL', XXL: 'XXL' }
  };

  const productColors = ['white', 'black', 'red', 'blue', 'green', 'yellow'];

  const addImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newElement: DesignElement = {
          id: Date.now().toString(),
          type: 'image',
          content: e.target?.result as string,
          x: 50,
          y: 50,
          width: 100,
          height: 100,
          rotation: 0
        };
        setElements([...elements, newElement]);
        setCurrentPrice(prev => prev + 50);
      };
      reader.readAsDataURL(file);
    }
  };

  const addText = () => {
    if (!textInput.trim()) return;
    
    const newElement: DesignElement = {
      id: Date.now().toString(),
      type: 'text',
      content: textInput,
      x: 50,
      y: 50,
      width: 200,
      height: 50,
      rotation: 0,
      color: '#000000',
      fontSize: 16,
      fontFamily: 'Arial'
    };
    setElements([...elements, newElement]);
    setTextInput('');
    setCurrentPrice(prev => prev + 30);
  };

  const updateElement = (id: string, updates: Partial<DesignElement>) => {
    setElements(elements.map(el => el.id === id ? { ...el, ...updates } : el));
  };

  const deleteElement = (id: string) => {
    setElements(elements.filter(el => el.id !== id));
    setSelectedElement(null);
    setCurrentPrice(prev => prev - (elements.find(el => el.id === id)?.type === 'image' ? 50 : 30));
  };

  const handleElementClick = (id: string) => {
    setSelectedElement(id);
  };

  const handleDragStart = (id: string) => {
    setDraggedElement(id);
  };

  const handleDragEnd = (event: React.MouseEvent, id: string) => {
    if (draggedElement === id) {
      const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      updateElement(id, { x: Math.max(0, Math.min(x, rect.width - 50)), y: Math.max(0, Math.min(y, rect.height - 50)) });
      setDraggedElement(null);
    }
  };

  const selectedElementData = elements.find(el => el.id === selectedElement);

  const getProductBackground = () => {
    if (productType === 'mug') {
      return productColor === 'white' ? 'bg-white' : `bg-${productColor}-500`;
    } else {
      return productColor === 'white' ? 'bg-white' : `bg-${productColor}-500`;
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon name={productType === 'mug' ? 'Coffee' : 'Shirt'} size={24} />
            Конструктор {productType === 'mug' ? 'кружек' : 'футболок'}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Design Canvas */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Превью товара</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative w-full h-96 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden">
                  {/* Product Base */}
                  <div className={`absolute inset-4 ${getProductBackground()} rounded-lg shadow-lg flex items-center justify-center`}>
                    {productType === 'mug' && (
                      <div className="w-8 h-16 bg-gray-400 rounded-r-full opacity-50" />
                    )}
                    
                    {/* Design Elements */}
                    {elements.map((element) => (
                      <div
                        key={element.id}
                        className={`absolute cursor-move border-2 ${selectedElement === element.id ? 'border-primary' : 'border-transparent'} hover:border-primary`}
                        style={{
                          left: `${element.x}px`,
                          top: `${element.y}px`,
                          width: `${element.width}px`,
                          height: `${element.height}px`,
                          transform: `rotate(${element.rotation}deg)`
                        }}
                        onClick={() => handleElementClick(element.id)}
                        onMouseDown={() => handleDragStart(element.id)}
                        onMouseUp={(e) => handleDragEnd(e, element.id)}
                      >
                        {element.type === 'image' ? (
                          <img
                            src={element.content}
                            alt="Design element"
                            className="w-full h-full object-cover rounded"
                            draggable={false}
                          />
                        ) : (
                          <div
                            className="w-full h-full flex items-center justify-center text-center break-words"
                            style={{
                              color: element.color,
                              fontSize: `${element.fontSize}px`,
                              fontFamily: element.fontFamily
                            }}
                          >
                            {element.content}
                          </div>
                        )}
                        
                        {selectedElement === element.id && (
                          <Button
                            size="sm"
                            variant="destructive"
                            className="absolute -top-2 -right-2 w-6 h-6 p-0"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteElement(element.id);
                            }}
                          >
                            <Icon name="X" size={12} />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  {elements.length === 0 && (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                      <div className="text-center">
                        <Icon name="ImagePlus" size={48} className="mx-auto mb-2 opacity-50" />
                        <p>Добавьте изображение или текст</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Controls Panel */}
          <div className="space-y-6">
            {/* Product Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Настройки товара</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Размер</Label>
                  <select 
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                    value={productSize}
                    onChange={(e) => setProductSize(e.target.value)}
                  >
                    {Object.entries(productSizes[productType]).map(([key, label]) => (
                      <option key={key} value={key}>{label}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <Label>Цвет</Label>
                  <div className="flex gap-2 mt-2">
                    {productColors.map((color) => (
                      <button
                        key={color}
                        className={`w-8 h-8 rounded-full border-2 ${productColor === color ? 'border-primary' : 'border-gray-300'}`}
                        style={{ backgroundColor: color === 'white' ? '#ffffff' : color }}
                        onClick={() => setProductColor(color)}
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Add Elements */}
            <Card>
              <CardHeader>
                <CardTitle>Добавить элементы</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="image" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="image">Изображение</TabsTrigger>
                    <TabsTrigger value="text">Текст</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="image" className="space-y-4">
                    <Button
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full"
                      variant="outline"
                    >
                      <Icon name="Upload" size={16} className="mr-2" />
                      Загрузить изображение
                    </Button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={addImage}
                      className="hidden"
                    />
                    <p className="text-sm text-gray-500">
                      Поддерживаются: JPG, PNG, GIF до 10MB
                    </p>
                  </TabsContent>
                  
                  <TabsContent value="text" className="space-y-4">
                    <div>
                      <Label>Введите текст</Label>
                      <Textarea
                        value={textInput}
                        onChange={(e) => setTextInput(e.target.value)}
                        placeholder="Ваш текст..."
                        className="mt-1"
                      />
                    </div>
                    <Button onClick={addText} disabled={!textInput.trim()} className="w-full">
                      <Icon name="Plus" size={16} className="mr-2" />
                      Добавить текст
                    </Button>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Element Controls */}
            {selectedElementData && (
              <Card>
                <CardHeader>
                  <CardTitle>Настройки элемента</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Размер</Label>
                    <Slider
                      value={[selectedElementData.width]}
                      onValueChange={([width]) => updateElement(selectedElementData.id, { width, height: width })}
                      min={20}
                      max={200}
                      step={1}
                      className="mt-2"
                    />
                  </div>
                  
                  <div>
                    <Label>Поворот</Label>
                    <Slider
                      value={[selectedElementData.rotation]}
                      onValueChange={([rotation]) => updateElement(selectedElementData.id, { rotation })}
                      min={-180}
                      max={180}
                      step={1}
                      className="mt-2"
                    />
                  </div>

                  {selectedElementData.type === 'text' && (
                    <>
                      <div>
                        <Label>Цвет текста</Label>
                        <Input
                          type="color"
                          value={selectedElementData.color}
                          onChange={(e) => updateElement(selectedElementData.id, { color: e.target.value })}
                          className="mt-1 h-10"
                        />
                      </div>
                      
                      <div>
                        <Label>Размер шрифта</Label>
                        <Slider
                          value={[selectedElementData.fontSize || 16]}
                          onValueChange={([fontSize]) => updateElement(selectedElementData.id, { fontSize })}
                          min={8}
                          max={48}
                          step={1}
                          className="mt-2"
                        />
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Price & Order */}
            <Card>
              <CardHeader>
                <CardTitle>Итого</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Цена:</span>
                  <Badge variant="secondary" className="bg-primary text-white text-lg px-3 py-1">
                    {currentPrice}₽
                  </Badge>
                </div>
                <Separator />
                <Button className="w-full bg-gradient-to-r from-primary to-secondary">
                  <Icon name="ShoppingCart" size={16} className="mr-2" />
                  Добавить в корзину
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDesigner;