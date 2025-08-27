import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import ProductDesigner from '@/components/ProductDesigner';

const Index = () => {
  const [selectedService, setSelectedService] = useState('');

  const services = [
    {
      id: 'mugs',
      title: 'Печать на кружках',
      description: 'Индивидуальный принт с вашими фотографиями и дизайном',
      price: 'от 350₽',
      icon: 'Coffee'
    },
    {
      id: 'tshirts',
      title: 'Печать на футболках',
      description: 'Персонализированные футболки любых размеров',
      price: 'от 450₽',
      icon: 'Shirt'
    },
    {
      id: 'photo',
      title: 'Фотоуслуги',
      description: 'Профессиональная съемка и печать фотографий',
      price: 'от 15₽/шт',
      icon: 'Camera'
    },
    {
      id: 'xerox',
      title: 'Ксерокопирование',
      description: 'Быстрое копирование документов любого формата',
      price: 'от 5₽/лист',
      icon: 'Printer'
    },
    {
      id: 'digitization',
      title: 'Оцифровка носителей',
      description: 'Перевод пленок и кассет в цифровой формат',
      price: 'от 200₽',
      icon: 'Film'
    },
    {
      id: 'other',
      title: 'Другие услуги',
      description: 'Ламинирование, брошюровка, дизайн макетов',
      price: 'от 50₽',
      icon: 'FileText'
    }
  ];

  const gallery = [
    { id: 1, title: 'Кружки с фото', image: '/img/1a0ce92f-9b6a-4176-a070-418ef6cb9165.jpg' },
    { id: 2, title: 'Оборудование', image: '/img/b1db3cf3-3ce4-4715-a5cb-fe690b953cbe.jpg' },
    { id: 3, title: 'Готовые работы', image: '/img/7fc4aa3b-25e7-4de5-a890-81f3c51c1879.jpg' }
  ];

  const reviews = [
    {
      name: 'Анна М.',
      rating: 5,
      text: 'Отличное качество печати на кружках! Быстро и аккуратно выполнили заказ.',
      date: '15 августа 2024'
    },
    {
      name: 'Игорь П.',
      rating: 5,
      text: 'Оцифровали старые кассеты - качество супер! Очень доволен результатом.',
      date: '8 августа 2024'
    },
    {
      name: 'Мария К.',
      rating: 5,
      text: 'Печатаю фото только здесь. Цвета насыщенные, бумага качественная.',
      date: '1 августа 2024'
    }
  ];

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Icon name="Printer" size={32} className="text-primary" />
              <h1 className="text-2xl font-bold text-gray-800">Фото.Печать.Ксерокс</h1>
            </div>
            <div className="hidden md:flex space-x-6">
              {['services', 'gallery', 'prices', 'reviews', 'contacts'].map((item) => (
                <Button
                  key={item}
                  variant="ghost"
                  onClick={() => scrollToSection(item)}
                  className="text-gray-700 hover:text-primary transition-colors"
                >
                  {item === 'services' && 'Услуги'}
                  {item === 'gallery' && 'Галерея'}
                  {item === 'prices' && 'Цены'}
                  {item === 'reviews' && 'Отзывы'}
                  {item === 'contacts' && 'Контакты'}
                </Button>
              ))}
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 text-center">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-bold text-gray-800 mb-6">
              Качественные услуги печати и копирования в{' '}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Видном
              </span>
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Печать на кружках и футболках, фотоуслуги, ксерокопирование, оцифровка.
              Быстро, качественно, по доступным ценам!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transform hover:scale-105 transition-all"
                onClick={() => scrollToSection('contacts')}
              >
                <Icon name="Phone" size={20} className="mr-2" />
                Заказать услугу
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                onClick={() => scrollToSection('services')}
                className="border-primary text-primary hover:bg-primary hover:text-white transition-all"
              >
                <Icon name="Eye" size={20} className="mr-2" />
                Посмотреть услуги
              </Button>
              <ProductDesigner 
                productType="mug"
                trigger={
                  <Button size="lg" variant="secondary">
                    <Icon name="Palette" size={20} className="mr-2" />
                    Конструктор
                  </Button>
                }
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">Наши услуги</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Мы предоставляем полный спектр услуг печати и копирования с использованием современного оборудования
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Card 
                key={service.id} 
                className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer border-l-4 border-l-primary"
              >
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg">
                      <Icon name={service.icon as any} size={24} className="text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{service.title}</CardTitle>
                      <Badge variant="secondary" className="bg-gradient-to-r from-secondary to-primary text-white">
                        {service.price}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 mb-4">
                    {service.description}
                  </CardDescription>
                  {(service.id === 'mugs' || service.id === 'tshirts') && (
                    <ProductDesigner 
                      productType={service.id === 'mugs' ? 'mug' : 'tshirt'}
                      trigger={
                        <Button variant="outline" size="sm" className="w-full">
                          <Icon name="Palette" size={16} className="mr-2" />
                          Создать дизайн
                        </Button>
                      }
                    />
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">Галерея работ</h3>
            <p className="text-gray-600">Примеры наших работ и оборудование</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {gallery.map((item) => (
              <div 
                key={item.id} 
                className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 text-white">
                    <h4 className="text-lg font-semibold">{item.title}</h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prices Section */}
      <section id="prices" className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">Цены</h3>
            <p className="text-gray-600">Прозрачные и справедливые цены на все услуги</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b">
                    <span className="font-medium">Печать на кружке (белая/цветная)</span>
                    <span className="text-primary font-bold">350₽ / 450₽</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b">
                    <span className="font-medium">Печать на футболке</span>
                    <span className="text-primary font-bold">от 450₽</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b">
                    <span className="font-medium">Фото печать 10x15</span>
                    <span className="text-primary font-bold">15₽</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b">
                    <span className="font-medium">Ксерокопия А4 ч/б</span>
                    <span className="text-primary font-bold">5₽</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b">
                    <span className="font-medium">Оцифровка фотопленки (36 кадров)</span>
                    <span className="text-primary font-bold">200₽</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="font-medium">Оцифровка видеокассеты (1 час)</span>
                    <span className="text-primary font-bold">300₽</span>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg">
                  <p className="text-sm text-gray-700">
                    <Icon name="Info" size={16} className="inline mr-1" />
                    Точные цены уточняйте по телефону. Возможны скидки при больших объемах.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">Отзывы клиентов</h3>
            <p className="text-gray-600">Что говорят о нас наши клиенты</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="flex space-x-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Icon key={i} name="Star" size={16} className="fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-500">{review.date}</span>
                  </div>
                  <p className="text-gray-700 mb-3">"{review.text}"</p>
                  <p className="font-semibold text-gray-800">— {review.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
              <Icon name="ExternalLink" size={20} className="mr-2" />
              Смотреть все отзывы на Яндекс.Картах
            </Button>
          </div>
        </div>
      </section>

      {/* Contacts Section */}
      <section id="contacts" className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">Контакты</h3>
            <p className="text-gray-600">Свяжитесь с нами удобным способом</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle>Наши контакты</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Icon name="MapPin" size={20} className="text-primary" />
                  <div>
                    <p className="font-semibold">Адрес:</p>
                    <p className="text-gray-600">г. Видное, ул. Радужная, дом 2, -1 этаж</p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center space-x-3">
                  <Icon name="Phone" size={20} className="text-primary" />
                  <div>
                    <p className="font-semibold">Телефон:</p>
                    <a href="tel:+79175054415" className="text-primary hover:underline">
                      8 917 505 44 15
                    </a>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center space-x-3">
                  <Icon name="Mail" size={20} className="text-primary" />
                  <div>
                    <p className="font-semibold">Email:</p>
                    <a href="mailto:photochka_pk@mail.ru" className="text-primary hover:underline">
                      photochka_pk@mail.ru
                    </a>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center space-x-3">
                  <Icon name="Clock" size={20} className="text-primary" />
                  <div>
                    <p className="font-semibold">Режим работы:</p>
                    <p className="text-gray-600">Пн-Пт: 9:00-19:00<br />Сб-Вс: 10:00-17:00</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle>Форма обратной связи</CardTitle>
                <CardDescription>
                  Оставьте заявку и мы свяжемся с вами в течение часа
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Имя *</label>
                  <Input placeholder="Ваше имя" className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium">Телефон *</label>
                  <Input placeholder="+7 (___) ___-__-__" className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium">Выберите услугу</label>
                  <select 
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                  >
                    <option value="">Выберите услугу</option>
                    {services.map((service) => (
                      <option key={service.id} value={service.id}>
                        {service.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium">Комментарии</label>
                  <Textarea 
                    placeholder="Расскажите подробнее о вашем заказе..."
                    className="mt-1"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Загрузить макет</label>
                  <Input type="file" className="mt-1" accept="image/*,.pdf" />
                </div>
                <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                  <Icon name="Send" size={20} className="mr-2" />
                  Отправить заявку
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Map */}
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Как нас найти</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-600">
                    <Icon name="MapPin" size={48} className="mx-auto mb-2" />
                    <p className="font-semibold">Интерактивная карта Яндекс</p>
                    <p className="text-sm">г. Видное, ул. Радужная, дом 2, -1 этаж</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center items-center space-x-2 mb-4">
            <Icon name="Printer" size={24} className="text-primary" />
            <h4 className="text-xl font-bold">Фото.Печать.Ксерокс</h4>
          </div>
          <p className="text-gray-400 mb-2">
            Качественные услуги печати и копирования в Видном
          </p>
          <p className="text-gray-400 text-sm">
            © 2024 Фото.Печать.Ксерокс. Все права защищены.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;