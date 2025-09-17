import React, { useState, useEffect } from 'react';
import { Heart, Calendar, MapPin, Camera, MessageCircle, Phone, Facebook, Instagram, Music, Music as MusicOff, Plus, Gift } from 'lucide-react';

interface Wish {
  id: number;
  name: string;
  message: string;
  reactions: { heart: number; party: number; love: number };
  timestamp: Date;
}

const SHEET_API = "https://script.google.com/macros/s/AKfycbzxaEMEKdss-AXdj-ZagnyIk6sM-AQ81-dsmjhcIXtwAsVCqZID_nFP_SjYE8C0hUbGbQ/exec"

const chunkArray = (arr: any, size: any) => {
  const chunkedArr = [];
  for (let i = 0; i < arr.length; i += size) {
      chunkedArr.push(arr.slice(i, i + size));
  }
  return chunkedArr;
};

function App() {
  const [currentSection, setCurrentSection] = useState('home');
  const [isPlaying, setIsPlaying] = useState(false);
  // const [wishes, setWishes] = useState<Wish[]>([
  //   {
  //     id: 1,
  //     name: "Khang",
  //     message: "Lương Sơn Bá có Chúc Anh Đài, Nguyễn Phạm Khang thì chúc anh chị đường dài có nhau 💕",
  //     reactions: { heart: 12, party: 8, love: 15 },
  //     timestamp: new Date(2025, 9, 17)
  //   },
  // ]);
  // const [newWish, setNewWish] = useState({ name: '', message: '' });
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [newWish, setNewWish] = useState({ name: '', message: '' });

  const scrollToSection = (sectionId: string) => {
    setCurrentSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // const addWish = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (newWish.name.trim() && newWish.message.trim()) {
  //     const wish: Wish = {
  //       id: Date.now(),
  //       name: newWish.name.trim(),
  //       message: newWish.message.trim(),
  //       reactions: { heart: 0, party: 0, love: 0 },
  //       timestamp: new Date()
  //     };
  //     setWishes([wish, ...wishes]);
  //     setNewWish({ name: '', message: '' });
  //   }
  // };

  // const addReaction = (wishId: number, type: 'heart' | 'party' | 'love') => {
  //   setWishes(wishes.map(wish => 
  //     wish.id === wishId 
  //       ? { ...wish, reactions: { ...wish.reactions, [type]: wish.reactions[type] + 1 } }
  //       : wish
  //   ));
  // };

  const milestones = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Cuộc Phỏng Vấn Định Mệnh",
      date: "Ngày 11 tháng 3 năm 2021",
      description: "Lần đầu gặp nhau, cô ấy là nhân viên của tôi",
      image: "/images/story/1/1.jpg"
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Lời Tỏ Tình Dễ Thương",
      date: "2022",
      description: "Sau đó là một người bạn đồng hành trên mọi cuộc vui và thăng trầm trong cuộc sống...",
      image: "https://images.pexels.com/photos/1024992/pexels-photo-1024992.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
    },
    {
      icon: <Gift className="w-6 h-6" />,
      title: "Ngày Cầu Hôn",
      date: "Tháng 10, 2023",
      description: "Giờ thì cô ấy đã là vợ tôi",
      image: "/images/story/3/1-2.jpg"
    }
  ];

  const [activeFilter, setActiveFilter] = useState('all');

  const categories = [
    { id: 'all', name: 'Tất Cả' },
    { id: 'quang-ngai', name: 'Quảng Ngãi' },
    { id: 'vung-tau', name: 'Vũng Tàu' },
    { id: 'da-lat', name: 'Đà Lạt' }
  ];

  const photos = [
    // Quảng Ngãi
    { id: 1, category: 'quang-ngai', url: '/images/wedding/quang_ngai/1.jpg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop', alt: 'Quảng Ngãi'},
    { id: 2, category: 'quang-ngai', url: '/images/wedding/quang_ngai/2.jpg?auto=compress&cs=tinysrgb&w=600&h=900&fit=crop', alt: ''},
    { id: 3, category: 'quang-ngai', url: '/images/wedding/quang_ngai/3.jpg?auto=compress&cs=tinysrgb&w=600&h=500&fit=crop', alt: ''},
    { id: 4, category: 'quang-ngai', url: '/images/wedding/quang_ngai/4.jpg?auto=compress&cs=tinysrgb&w=600&h=500&fit=crop', alt: ''},
    { id: 5, category: 'quang-ngai', url: '/images/wedding/quang_ngai/5.jpg?auto=compress&cs=tinysrgb&w=600&h=700&fit=crop', alt: ''},
    { id: 6, category: 'quang-ngai', url: '/images/wedding/quang_ngai/6.jpg?auto=compress&cs=tinysrgb&w=600&h=500&fit=crop', alt: ''},
    { id: 7, category: 'quang-ngai', url: '/images/wedding/quang_ngai/7.jpg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop', alt: ''},
    { id: 8, category: 'quang-ngai', url: '/images/wedding/quang_ngai/8.jpg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop', alt: ''},
    { id: 9, category: 'quang-ngai', url: '/images/wedding/quang_ngai/9.jpg?auto=compress&cs=tinysrgb&w=600&h=900&fit=crop', alt: ''},
    { id: 10, category: 'quang-ngai', url: '/images/wedding/quang_ngai/10.jpg?auto=compress&cs=tinysrgb&w=600&h=500&fit=crop', alt: ''},
    { id: 11, category: 'quang-ngai', url: '/images/wedding/quang_ngai/11.jpg?auto=compress&cs=tinysrgb&w=600&h=500&fit=crop', alt: ''},
    { id: 12, category: 'quang-ngai', url: '/images/wedding/quang_ngai/12.jpg?auto=compress&cs=tinysrgb&w=600&h=700&fit=crop', alt: ''},
    // Vũng Tàu
    { id: 13, category: 'vung-tau', url: '/images/wedding/vung_tau/1.jpg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop', alt: ''},
    { id: 14, category: 'vung-tau', url: '/images/wedding/vung_tau/2.jpg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop', alt: ''},
    { id: 15, category: 'vung-tau', url: '/images/wedding/vung_tau/3.jpg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop', alt: ''},
    { id: 16, category: 'vung-tau', url: '/images/wedding/vung_tau/4.jpg?auto=compress&cs=tinysrgb&w=600&h=900&fit=crop', alt: ''},
    { id: 17, category: 'vung-tau', url: '/images/wedding/vung_tau/5.jpg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop', alt: ''},
    { id: 18, category: 'vung-tau', url: '/images/wedding/vung_tau/6.jpg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop', alt: ''},
    { id: 19, category: 'vung-tau', url: '/images/wedding/vung_tau/7.jpg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop', alt: ''},
    { id: 20, category: 'vung-tau', url: '/images/wedding/vung_tau/8.jpg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop', alt: ''},
    { id: 21, category: 'vung-tau', url: '/images/wedding/vung_tau/9.jpg?auto=compress&cs=tinysrgb&w=600&h=900&fit=crop', alt: ''},
    { id: 22, category: 'vung-tau', url: '/images/wedding/vung_tau/10.jpg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop', alt: ''},
    { id: 23, category: 'vung-tau', url: '/images/wedding/vung_tau/11.jpg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop', alt: ''},
    { id: 24, category: 'vung-tau', url: '/images/wedding/vung_tau/12.jpg?auto=compress&cs=tinysrgb&w=600&h=500&fit=crop', alt: ''},
  ];

  const filteredPhotos = activeFilter === 'all' 
    ? [...photos].sort(() => Math.random() - 0.5)
    : photos.filter(photo => photo.category === activeFilter);
  
  const columnPhotos = [
    filteredPhotos.filter((_, i) => i % 3 === 0),
    filteredPhotos.filter((_, i) => i % 3 === 1),
    filteredPhotos.filter((_, i) => i % 3 === 2)
  ];
  
  const columnRefs = [
    React.useRef<HTMLDivElement>(null),
    React.useRef<HTMLDivElement>(null),
    React.useRef<HTMLDivElement>(null),
  ];
  
  const animateColumns = () => {
    columnRefs.forEach(ref => {
      if (ref.current) {
        ref.current.style.animation = 'none';
        ref.current.offsetHeight; 
        ref.current.style.animation = '';
      }
    });
  };
  // Falling petals animation
  useEffect(() => {
    const createPetal = () => {
      const petal = document.createElement('div');
      petal.className = 'fixed pointer-events-none z-10 opacity-60';
      petal.innerHTML = '🌸';
      petal.style.left = Math.random() * 100 + 'vw';
      petal.style.animationDuration = (Math.random() * 10 + 10) + 's';
      petal.style.animationName = 'fall';
      petal.style.animationTimingFunction = 'linear';
      petal.style.animationIterationCount = '1';
      petal.style.fontSize = (Math.random() * 10 + 15) + 'px';
      
      document.body.appendChild(petal);
      
      setTimeout(() => {
        document.body.removeChild(petal);
      }, 20000);
    };

    const petalInterval = setInterval(createPetal, 2000);
    
    // Thêm CSS animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fall {
        0% { transform: translateY(-100vh) rotate(0deg); }
        100% { transform: translateY(100vh) rotate(360deg); }
      }
      @keyframes scroll-up {
        0% { transform: translateY(0); }
        100% { transform: translateY(-100%); }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      clearInterval(petalInterval);
      document.head.removeChild(style);
    };
  }, []); // [] đảm bảo useEffect này chỉ chạy một lần khi component được mount

  // useEffect thứ hai: Khởi động lại animation cuộn khi filter thay đổi
  useEffect(() => {
    if (activeFilter === 'all') {
      animateColumns();
    }
  }, [activeFilter]); 

  useEffect(() => {
    fetch(SHEET_API)
      .then(res => res.json())
      .then(data => setWishes(
        data.map((w: any) => ({
          id: w.id,
          name: w.name,
          message: w.message,
          reactions: {
            heart: Number(w.heart),
            party: Number(w.party),
            love: Number(w.love),
          },
          timestamp: new Date(w.created_at)
        }))
      ));
  }, []);

  // Gửi wish mới
  const addWish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWish.name.trim() || !newWish.message.trim()) return;

    const res = await fetch(SHEET_API, {
      method: "POST",
      body: JSON.stringify({
        name: newWish.name,
        message: newWish.message
      }),
      headers: { "Content-Type": "application/json" }
    });
    const result = await res.json();

    if (result.status === "success") {
      setWishes([{
        id: result.id,
        name: newWish.name,
        message: newWish.message,
        reactions: { heart: 0, party: 0, love: 0 },
        timestamp: new Date()
      }, ...wishes]);
      setNewWish({ name: '', message: '' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-blue-50 to-pink-50">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="font-script text-2xl text-pink-600">AleJas</div>
            <div className="hidden md:flex space-x-8">
              <button onClick={() => scrollToSection('home')} className="text-gray-600 hover:text-pink-500 transition-colors">Trang chủ</button>
              <button onClick={() => scrollToSection('story')} className="text-gray-600 hover:text-pink-500 transition-colors">Câu chuyện</button>
              <button onClick={() => scrollToSection('gallery')} className="text-gray-600 hover:text-pink-500 transition-colors">Album</button>
              <button onClick={() => scrollToSection('events')} className="text-gray-600 hover:text-pink-500 transition-colors">Tiệc cưới</button>
              <button onClick={() => scrollToSection('wishes')} className="text-gray-600 hover:text-pink-500 transition-colors">Lời chúc</button>
            </div>
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="bg-pink-100 p-2 rounded-full hover:bg-pink-200 transition-colors"
            >
              {isPlaying ? <MusicOff className="w-5 h-5 text-pink-600" /> : <Music className="w-5 h-5 text-pink-600" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/images/home_banner.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30"></div>
      </div>
        
        <div className="relative z-20 text-center text-white px-6">
          <h1 className="font-script text-6xl md:text-8xl mb-4 animate-fade-in">
            <span className="text-pink-400">Đinh Thảo</span>
            <span className="bg-gradient-pink-blue bg-clip-text text-transparent"> & </span>
            <span className="text-blue-400">Ánh Lài</span>
          </h1>
          <div className="flex items-center justify-center mb-8 text-xl md:text-2xl">
            <span className="inline-flex items-center text-blue-200 bg-clip-text text-transparent">
                <Calendar className="w-6 h-6 mr-3 text-blue-200" />
            </span>
            <span className="inline-flex items-center text-blue-200">09 • 10 • 2025</span>
          </div>
          <div className="flex items-center justify-center mb-12 text-lg">
            <span className="text-blue-200">
              <MapPin className="w-5 h-5 mr-2" />
            </span>
            <span className="inline-flex items-center text-blue-200">
              Đà Lạt
            </span>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => scrollToSection('gallery')}
              className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-full transition-all transform hover:scale-105 shadow-lg"
            >
              <Camera className="inline w-5 h-5 mr-2" />
              Xem Album
            </button>
            <button 
              onClick={() => scrollToSection('events')}
              className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-pink-200 px-8 py-3 rounded-full transition-all transform hover:scale-105 shadow-lg border border-pink"
            >
              <MapPin className="inline w-5 h-5 mr-2" />
              Thông tin Tiệc Cưới
            </button>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section id="story" className="py-20 bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-script text-pink-500 mb-4">
              Câu Chuyện Tình Yêu
            </h2>
            <p className="font-romantic italic text-blue-pastel text-lg max-w-2xl mx-auto">
              "Khi yêu nhau không có phải là ai kèo dưới ai kèo trên, nó không phải như vậy, mình nhường nhịn người con gái của mình vì mình muốn làm như vậy..."
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {milestones.map((milestone, index) => (
              <div key={index} className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center mb-16 group`}>
                <div className="md:w-1/2 mb-8 md:mb-0">
                  <img 
                    src={milestone.image} 
                    alt={milestone.title}
                    className="w-full h-80 object-cover rounded-2xl shadow-lg transform group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pl-12' : 'md:pr-12'} text-center md:text-left`}>
                  <div className="flex items-center justify-center md:justify-start mb-4">
                    <div className="bg-pink-400 text-white p-3 rounded-full mr-4">
                      {milestone.icon}
                    </div>
                    <span className="text-pink-400 font-semibold">{milestone.date}</span>
                  </div>
                  <h3 className="text-2xl font-script font-bold text-pink-400 mb-4">{milestone.title}</h3>
                  <p className="font-romantic text-blue-400 text-lg leading-relaxed">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="gallery" className="py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-script text-blue-500 mb-4">
              Album Kỷ Niệm
            </h2>
            <p className="font-romantic italic text-pink-pastel text-lg max-w-2xl mx-auto mb-8">
              Những khoảnh khắc đẹp nhất được lưu giữ mãi mãi trong tình yêu của chúng mình
            </p>
            
            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setActiveFilter(category.id)}
                  className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                    activeFilter === category.id
                      ? 'bg-pink-500 text-white shadow-lg transform scale-105'
                      : 'bg-gray-100 text-gray-600 hover:bg-pink-100 hover:text-pink-600'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Photo Grid */}
          { activeFilter === 'all' ? (
            // <div className="flex justify-between overflow-hidden relative h-[900px]"> {/* Đặt chiều cao cố định cho khung cuộn */}
            //   {columnPhotos.map((column, colIndex) => (
            //     <div key={colIndex} className="w-1/3 flex flex-col gap-4 mx-2 relative h-full">
            //       {/* Wrapper cho hiệu ứng cuộn */}
            //       <div 
            //         ref={columnRefs[colIndex]}
            //         className="w-full flex flex-col gap-4 absolute top-0 left-0"
            //         style={{
            //           animation: `scroll-up 60s linear infinite`,
            //         }}
            //       >
            //         {
            //           [...column, ...column].map((photo, photoIndex) => (
            //             <div 
            //               key={`${photo.id}-${photoIndex}`}
            //               className="break-inside-avoid group cursor-pointer"
            //             >
            //               <img 
            //                 src={photo.url}
            //                 alt={photo.alt}
            //                 className="w-full rounded-lg shadow-md group-hover:shadow-xl transform transition-all duration-300"
            //               />
            //             </div>
            //           ))
            //         }
            //       </div>
            //     </div>
            //   ))}
            // </div>
            <div className="max-h-[70vh] overflow-y-auto pr-4">
              <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
                {filteredPhotos.map(photo => (
                  <div key={photo.id} className="break-inside-avoid mb-4 group cursor-pointer">
                    <img
                      src={photo.url}
                      alt={photo.alt || 'Wedding photo'}
                      className="w-full rounded-lg shadow-md group-hover:shadow-xl transform transition-all duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
              {filteredPhotos.map(photo => (
                <div 
                  key={photo.id} 
                  className="break-inside-avoid group cursor-pointer"
                >
                  <img 
                    src={photo.url}
                    alt={photo.alt}
                    className="w-full rounded-lg shadow-md group-hover:shadow-xl transform transition-all duration-300"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-script text-center mb-16 text-gray-800">Thông tin tiệc cưới</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-[#F3E7FF] to-[#FFD1DC] rounded-2xl p-8 shadow-lg relative">
              {/* <div className="absolute top-4 right-4 text-green-500 text-2xl">✅</div> */}
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">Quảng Ngãi</h3>
              <div className="space-y-3 text-gray-600">
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 mr-3 text-green-500" />
                  <span>Đã tổ chức</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-3 text-green-500" />
                  <span>Quảng Ngãi</span>
                </div>
              </div>
              <p className="mt-4 text-sm text-gray-500">Cảm ơn tất cả mọi người đã đến chung vui cùng chúng mình!</p>
            </div>

            <div className="bg-gradient-to-br from-[#F3E7FF] to-[#FFD1DC] rounded-2xl p-8 shadow-lg relative">
              {/* <div className="absolute top-4 right-4 text-green-500 text-2xl">✅</div> */}
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">Vũng Tàu</h3>
              <div className="space-y-3 text-gray-600">
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 mr-3 text-green-500" />
                  <span>Đã tổ chức</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-3 text-green-500" />
                  <span>Vũng Tàu</span>
                </div>
              </div>
              <p className="mt-4 text-sm text-gray-500">Một buổi tiệc thật ý nghĩa với gia đình và bạn bè!</p>
            </div>

            <div className="bg-gradient-to-br from-[#E1F5FE] to-[#FFF5E1] rounded-2xl p-8 shadow-lg relative">
              {/* <div className="absolute top-4 right-4 text-blue-500 text-2xl">🗓️</div> */}
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">Đà Lạt</h3>
              <div className="space-y-3 text-gray-600">
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 mr-3 text-blue-500" />
                  <span>09/10/2025</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-3 text-blue-500" />
                  <span>Đà Lạt</span>
                </div>
              </div>
              <button className="mt-6 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full transition-colors w-full">
                <Calendar className="inline w-4 h-4 mr-2" />
                Lưu vào lịch
              </button>
              <p className="mt-4 text-sm text-blue-600 font-medium">Coming soon! Thông tin chi tiết sẽ cập nhật sớm.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Guestbook Section */}
      <section id="wishes" className="py-20 bg-gradient-to-br from-pink-50 to-blue-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-script text-center mb-16 text-gray-800">Lời chúc từ bạn</h2>
          
          <div className="max-w-4xl mx-auto">
            <form onSubmit={addWish} className="bg-white rounded-2xl p-8 shadow-lg mb-12">
              <div className="mb-6">
                <input
                  type="text"
                  placeholder="Tên của bạn"
                  value={newWish.name}
                  onChange={(e) => setNewWish({...newWish, name: e.target.value})}
                  className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300"
                  required
                />
              </div>
              <textarea
                placeholder="Gửi lời chúc đến cặp đôi..."
                value={newWish.message}
                onChange={(e) => setNewWish({...newWish, message: e.target.value})}
                rows={4}
                className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 mb-6"
                required
              />
              <button 
                type="submit"
                className="bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 text-white px-8 py-3 rounded-xl transition-all transform hover:scale-105 shadow-lg"
              >
                <Plus className="inline w-5 h-5 mr-2" />
                Gửi lời chúc
              </button>
            </form>

            <div className="space-y-6">
              {wishes.map((wish) => (
                <div key={wish.id} className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-800">{wish.name}</h3>
                      <p className="text-sm text-gray-500">
                        {wish.timestamp.toLocaleDateString('vi-VN')}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4 leading-relaxed">{wish.message}</p>
                  <div className="flex items-center space-x-4">
                    <button 
                      // onClick={() => addReaction(wish.id, 'heart')}
                      className="flex items-center space-x-1 text-red-500 hover:bg-red-50 px-3 py-1 rounded-full transition-colors"
                    >
                      <span>❤️</span>
                      <span className="text-sm">{wish.reactions.heart}</span>
                    </button>
                    <button 
                      // onClick={() => addReaction(wish.id, 'party')}
                      className="flex items-center space-x-1 text-yellow-500 hover:bg-yellow-50 px-3 py-1 rounded-full transition-colors"
                    >
                      <span>🎉</span>
                      <span className="text-sm">{wish.reactions.party}</span>
                    </button>
                    <button 
                      // onClick={() => addReaction(wish.id, 'love')}
                      className="flex items-center space-x-1 text-pink-500 hover:bg-pink-50 px-3 py-1 rounded-full transition-colors"
                    >
                      <span>😍</span>
                      <span className="text-sm">{wish.reactions.love}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      {/* <section className="py-20 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-script mb-16 text-gray-800">Liên hệ</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <a href="tel:+84123456789" className="bg-gradient-to-br from-pink-100 to-pink-50 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
              <Phone className="w-8 h-8 mx-auto mb-4 text-pink-600" />
              <p className="font-semibold text-gray-800">Điện thoại</p>
              <p className="text-gray-600">0123 456 789</p>
            </a>
            
            <a href="#" className="bg-gradient-to-br from-blue-100 to-blue-50 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
              <Facebook className="w-8 h-8 mx-auto mb-4 text-blue-600" />
              <p className="font-semibold text-gray-800">Facebook</p>
              <p className="text-gray-600">Ánh Lài & Đinh Thảo</p>
            </a>
            
            <a href="#" className="bg-gradient-to-br from-purple-100 to-purple-50 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
              <Instagram className="w-8 h-8 mx-auto mb-4 text-purple-600" />
              <p className="font-semibold text-gray-800">Instagram</p>
              <p className="text-gray-600">@anhlai_dinhthao</p>
            </a>
          </div>
        </div>
      </section> */}

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-6 text-center">
          <div className="mb-6">
            <h3 className="font-script text-3xl mb-2">Đinh Thảo & Ánh Lài</h3>
            <p className="text-gray-300">09 • 10 • 2025</p>
          </div>
          {/* <div className="flex justify-center items-center space-x-2 text-gray-300">
            <Heart className="w-5 h-5 text-red-400" />
            <span>Made with love for our special day</span>
            <Heart className="w-5 h-5 text-red-400" />
          </div> */}
        </div>
      </footer>
    </div>
  );
}

export default App;