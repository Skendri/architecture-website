import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef as useReactRef } from 'react'
import { ExternalLink, ArrowRight, Filter, Grid, List, ChevronLeft, ChevronRight, Heart, ShoppingCart, Menu, X } from 'lucide-react'

// Icons (IKEA-style SVGs)
const LeftArrowIcon = () => (
  <svg viewBox="0 0 1433 1024" width="24" height="24">
    <path d="M1433.6 614.4H409.6l256 256-153.6 153.6L0 512 512 0l153.6 153.6-256 256h1024z" fill="currentColor"/>
  </svg>
)

const RightArrowIcon = () => (
  <svg viewBox="0 0 1433 1024" width="24" height="24">
    <path d="M0 614.4h1024l-256 256 153.6 153.6 512-512L921.6 0l-153.6 153.6 256 256H0z" fill="currentColor"/>
  </svg>
)

const HeartIcon = ({ filled }) => (
  <svg viewBox="0 0 1024 1024" width="24" height="24">
    <path d="M725.306 42.696c-83.56 0-159.122 34.342-213.306 89.668-54.202-55.326-129.746-89.668-213.32-89.668C133.732 42.696 0.018 176.41 0.018 341.342 0.018 682.69 512 981.304 512 981.304s511.982-298.616 511.982-639.962c0-164.932-133.714-298.646-298.676-298.646z" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="20"/>
  </svg>
)

const CartIcon = () => (
  <svg viewBox="0 0 1024 1024" width="24" height="24">
    <path d="M912.64 200A21.312 21.312 0 0 0 896 192H170.666667v426.666667h640c10.005333 0 18.645333-6.954667 20.842666-16.704l85.333334-384a21.333333 21.333333 0 0 0-4.202667-17.962667z" fill="currentColor"/>
  </svg>
)

const MenuIcon = () => (
  <svg viewBox="0 0 1024 1024" width="24" height="24">
    <path d="M128 469.333333m40.533333 0l686.933334 0q40.533333 0 40.533333 40.533334l0 4.266666q0 40.533333-40.533333 40.533334l-686.933334 0q-40.533333 0-40.533333-40.533334l0-4.266666q0-40.533333 40.533333-40.533334Z" fill="currentColor"/>
    <path d="M128 682.666667m40.533333 0l686.933334 0q40.533333 0 40.533333 40.533333l0 4.266667q0 40.533333-40.533333 40.533333l-686.933334 0q-40.533333 0-40.533333-40.533333l0-4.266667q0-40.533333 40.533333-40.533333Z" fill="currentColor"/>
    <path d="M128 256m40.533333 0l686.933334 0q40.533333 0 40.533333 40.533333l0 4.266667q0 40.533333-40.533333 40.533333l-686.933334 0q-40.533333 0-40.533333-40.533333l0-4.266667q0-40.533333 40.533333-40.533333Z" fill="currentColor"/>
  </svg>
)

// Project rooms data (IKEA-style room showcases)
const rooms = [
  {
    id: 0,
    name: "Modern Living",
    alt: "Modern Residential Complex",
    description: "Contemporary design meets sustainable living",
    src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
    itemIds: [1, 2, 3, 4, 5]
  },
  {
    id: 1,
    name: "Commercial Space",
    alt: "Corporate Headquarters",
    description: "Professional environments for productive teams",
    src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80",
    itemIds: [6, 7, 8, 9, 10]
  },
  {
    id: 2,
    name: "Cultural Hub",
    alt: "Cultural Arts Center",
    description: "Inspiring spaces for creativity and community",
    src: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80",
    itemIds: [11, 12, 13, 14, 15]
  }
]

// Items data (IKEA-style project items)
const items = [
  {
    id: 1,
    preview: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&q=80",
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"
    ],
    brand: "MODERN",
    name: "Sustainable Living",
    description: '50,000 sq ft • Downtown District',
    price: "2024"
  },
  {
    id: 2,
    preview: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&q=80",
    images: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80"
    ],
    brand: "CORPORATE",
    name: "Office Headquarters",
    description: '120,000 sq ft • Business Park',
    price: "2023"
  },
  {
    id: 3,
    preview: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&q=80",
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80"
    ],
    brand: "CULTURAL",
    name: "Arts Center",
    description: '75,000 sq ft • Cultural District',
    price: "2025"
  },
  {
    id: 4,
    preview: "https://images.unsplash.com/photo-1562774053-701939374585?w=400&q=80",
    images: [
      "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80",
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80"
    ],
    brand: "EDUCATIONAL",
    name: "School Campus",
    description: '200,000 sq ft • University District',
    price: "2024"
  },
  {
    id: 5,
    preview: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80",
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80"
    ],
    brand: "HOSPITALITY",
    name: "Luxury Resort",
    description: '300,000 sq ft • Coastal Area',
    price: "2026"
  },
  {
    id: 6,
    preview: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&q=80",
    images: [
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
      "https://images.unsplash.com/photo-1460317442991-0ec209397118?w=800&q=80",
      "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&q=80"
    ],
    brand: "MIXED-USE",
    name: "Urban Development",
    description: '500,000 sq ft • Urban Center',
    price: "2025"
  },
  {
    id: 7,
    preview: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=400&q=80",
    images: [
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80"
    ],
    brand: "RESIDENTIAL",
    name: "Apartment Complex",
    description: '85,000 sq ft • Metro Area',
    price: "2024"
  },
  {
    id: 8,
    preview: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=400&q=80",
    images: [
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=80",
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&q=80",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80"
    ],
    brand: "COMMERCIAL",
    name: "Business Center",
    description: '95,000 sq ft • Financial District',
    price: "2023"
  },
  {
    id: 9,
    preview: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=400&q=80",
    images: [
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&q=80"
    ],
    brand: "RESEARCH",
    name: "Tech Campus",
    description: '250,000 sq ft • Tech Park',
    price: "2025"
  },
  {
    id: 10,
    preview: "https://images.unsplash.com/photo-1572025224626-8b0890c05649?w=400&q=80",
    images: [
      "https://images.unsplash.com/photo-1572025224626-8b0890c05649?w=800&q=80",
      "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800&q=80",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80"
    ],
    brand: "HEALTHCARE",
    name: "Medical Center",
    description: '180,000 sq ft • Medical District',
    price: "2024"
  },
  {
    id: 11,
    preview: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    images: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
      "https://images.unsplash.com/photo-1461301214746-1e790926d323?w=800&q=80",
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80"
    ],
    brand: "CULTURAL",
    name: "Museum Gallery",
    description: '60,000 sq ft • Arts District',
    price: "2024"
  },
  {
    id: 12,
    preview: "https://images.unsplash.com/photo-1455587734955-081b22074882?w=400&q=80",
    images: [
      "https://images.unsplash.com/photo-1455587734955-081b22074882?w=800&q=80",
      "https://images.unsplash.com/photo-1465310477141-6fb93167a273?w=800&q=80",
      "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&q=80"
    ],
    brand: "SPORTS",
    name: "Sports Complex",
    description: '150,000 sq ft • Recreation Area',
    price: "2025"
  },
  {
    id: 13,
    preview: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&q=80",
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80"
    ],
    brand: "OFFICE",
    name: "Executive Suites",
    description: '45,000 sq ft • Downtown',
    price: "2023"
  },
  {
    id: 14,
    preview: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80",
      "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=800&q=80"
    ],
    brand: "RESIDENTIAL",
    name: "Villa Complex",
    description: '35,000 sq ft • Suburban Area',
    price: "2024"
  },
  {
    id: 15,
    preview: "https://images.unsplash.com/photo-1577985043696-8bd54d9c4f9b?w=400&q=80",
    images: [
      "https://images.unsplash.com/photo-1577985043696-8bd54d9c4f9b?w=800&q=80",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=80"
    ],
    brand: "RETAIL",
    name: "Shopping Center",
    description: '400,000 sq ft • Commercial Zone',
    price: "2025"
  }
]

const ProjectsPage = () => {
  const ref = useReactRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const projects = [
    {
      id: 1,
      title: 'Modern Residential Complex',
      category: 'Residential',
      description: 'A sustainable residential development featuring innovative green building techniques and modern amenities. This project showcases our commitment to eco-friendly living spaces.',
      image: '🏢',
      features: ['Solar Panels', 'Green Roof', 'Smart Home Tech', 'Rainwater Harvesting'],
      color: 'from-blue-500 to-cyan-500',
      status: 'Completed',
      year: '2024',
      area: '50,000 sq ft',
      location: 'Downtown District'
    },
    {
      id: 2,
      title: 'Corporate Headquarters',
      category: 'Commercial',
      description: 'An award-winning office building that combines functionality with stunning architectural design. Features state-of-the-art facilities and sustainable practices.',
      image: '🏢',
      features: ['LEED Certified', 'Open Workspaces', 'Natural Lighting', 'Green Spaces'],
      color: 'from-purple-500 to-pink-500',
      status: 'Completed',
      year: '2023',
      area: '120,000 sq ft',
      location: 'Business Park'
    },
    {
      id: 3,
      title: 'Cultural Arts Center',
      category: 'Cultural',
      description: 'A vibrant cultural hub designed to inspire creativity and bring communities together. Features performance halls, galleries, and community spaces.',
      image: '🎭',
      features: ['Performance Hall', 'Gallery Spaces', 'Community Areas', 'Outdoor Amphitheater'],
      color: 'from-orange-500 to-red-500',
      status: 'Under Construction',
      year: '2025',
      area: '75,000 sq ft',
      location: 'Cultural District'
    },
    {
      id: 4,
      title: 'Sustainable School Campus',
      category: 'Educational',
      description: 'An innovative educational facility that promotes learning through sustainable design principles and biophilic architecture.',
      image: '🎓',
      features: ['Natural Ventilation', 'Outdoor Classrooms', 'Renewable Energy', 'Learning Gardens'],
      color: 'from-green-500 to-emerald-500',
      status: 'Completed',
      year: '2024',
      area: '200,000 sq ft',
      location: 'University District'
    },
    {
      id: 5,
      title: 'Luxury Hotel Resort',
      category: 'Hospitality',
      description: 'A world-class resort that seamlessly blends luxury with environmental consciousness, featuring stunning ocean views and eco-friendly amenities.',
      image: '🏨',
      features: ['Ocean Views', 'Spa Facilities', 'Eco-Friendly Design', 'Infinity Pool'],
      color: 'from-teal-500 to-blue-500',
      status: 'Planning',
      year: '2026',
      area: '300,000 sq ft',
      location: 'Coastal Area'
    },
    {
      id: 6,
      title: 'Urban Mixed-Use Development',
      category: 'Mixed-Use',
      description: 'A comprehensive development that combines residential, commercial, and recreational spaces in a vibrant urban environment.',
      image: '🏙️',
      features: ['Retail Spaces', 'Residential Units', 'Public Parks', 'Community Center'],
      color: 'from-indigo-500 to-purple-500',
      status: 'Under Construction',
      year: '2025',
      area: '500,000 sq ft',
      location: 'Urban Center'
    }
  ]

  const categories = ['All', 'Residential', 'Commercial', 'Cultural', 'Educational', 'Hospitality', 'Mixed-Use']
  const [selectedCategory, setSelectedCategory] = React.useState('All')

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory)

  // IKEA-style carousel state
  const [currentSlide, setCurrentSlide] = useState(0)
  const [slideDirection, setSlideDirection] = useState(0)
  const carouselRef = useReactRef(null)

  const getItemsForRoom = (roomId) => {
    const room = rooms[roomId]
    if (!room) return []
    return items.filter(item => room.itemIds.includes(item.id))
  }

  const nextSlide = () => {
    setSlideDirection(1)
    setCurrentSlide((prev) => (prev + 1) % rooms.length)
  }

  const prevSlide = () => {
    setSlideDirection(-1)
    setCurrentSlide((prev) => (prev - 1 + rooms.length) % rooms.length)
  }

  const currentRoomItems = getItemsForRoom(currentSlide)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black pt-20">
      {/* IKEA-Style Room Carousel Section */}
      <section className="relative w-full h-[70vh] overflow-hidden bg-black">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <img
              src={rooms[currentSlide].src}
              alt={rooms[currentSlide].alt}
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* Slide Content */}
        <div className="absolute inset-0 flex flex-col justify-center items-start px-8 md:px-20 lg:px-32 z-10">
          <motion.div
            key={`content-${currentSlide}`}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="text-white text-lg md:text-xl mb-4 font-medium">
              {currentSlide + 1} / {rooms.length}
            </div>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6">
              {rooms[currentSlide].name}
            </h2>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl font-light">
              {rooms[currentSlide].description}
            </p>
            <motion.button
              className="bg-white text-black px-8 py-4 rounded-full font-semibold text-lg flex items-center gap-3 hover:bg-gray-200 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Projects
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm p-4 rounded-full hover:bg-white/30 transition-colors"
        >
          <LeftArrowIcon />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm p-4 rounded-full hover:bg-white/30 transition-colors"
        >
          <RightArrowIcon />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
          {rooms.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setSlideDirection(index > currentSlide ? 1 : -1)
                setCurrentSlide(index)
              }}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </section>

      {/* IKEA-Style Items Grid */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Featured Projects
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Discover our latest architectural achievements across different categories
            </p>
          </motion.div>

          {/* IKEA-style scrollable grid */}
          <div 
            className="flex gap-6 overflow-x-auto pb-8 snap-x"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {currentRoomItems.map((item, index) => (
              <motion.div
                key={item.id}
                className="flex-shrink-0 w-72 md:w-80 snap-center"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -10 }}
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300">
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={item.preview}
                      alt={item.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4">
                      <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors">
                        <HeartIcon filled={false} />
                      </button>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">
                      {item.brand}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {item.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-gray-900">
                        {item.price}
                      </span>
                      <motion.button
                        className="bg-black text-white px-6 py-2 rounded-full font-medium text-sm hover:bg-gray-800 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        View Details
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Navigation dots for items */}
          <div className="flex justify-center gap-2 mt-8">
            {currentRoomItems.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === 0 ? 'bg-cyan-500 w-6' : 'bg-gray-600 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* IKEA-Style Quick View Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            className="flex flex-col md:flex-row gap-8 items-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Large Image */}
            <div className="w-full md:w-1/2 relative">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80"
                  alt="Featured Project"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Content */}
            <div className="w-full md:w-1/2 space-y-6">
              <div className="inline-block bg-cyan-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                Featured Project
              </div>
              <h3 className="text-4xl font-bold text-white">
                Sustainable Modern Living
              </h3>
              <p className="text-gray-400 text-lg leading-relaxed">
                Experience the perfect blend of contemporary design and sustainable architecture. 
                Our award-winning residential complex features innovative green building techniques, 
                smart home technology, and modern amenities that redefine urban living.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-xl p-4">
                  <div className="text-3xl font-bold text-cyan-400">50,000</div>
                  <div className="text-gray-400 text-sm">Square Feet</div>
                </div>
                <div className="bg-white/5 rounded-xl p-4">
                  <div className="text-3xl font-bold text-cyan-400">2024</div>
                  <div className="text-gray-400 text-sm">Completion Year</div>
                </div>
                <div className="bg-white/5 rounded-xl p-4">
                  <div className="text-3xl font-bold text-cyan-400">LEED</div>
                  <div className="text-gray-400 text-sm">Certified</div>
                </div>
                <div className="bg-white/5 rounded-xl p-4">
                  <div className="text-3xl font-bold text-cyan-400">5★</div>
                  <div className="text-gray-400 text-sm">Rating</div>
                </div>
              </div>
              <motion.button
                className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-8 py-4 rounded-full font-semibold text-lg flex items-center gap-3"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Full Project
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0 }}
          >
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-8">
              Our <span className="gradient-text">Portfolio</span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Explore our comprehensive collection of architectural projects spanning residential, 
              commercial, cultural, and institutional designs that showcase our commitment to 
              innovation, sustainability, and exceptional design.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-10" ref={ref}>
        <div className="container">
          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            {categories.map((category, index) => (
              <motion.button
                key={category}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20 backdrop-blur-sm'
                }`}
                onClick={() => setSelectedCategory(category)}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20">
        <div className="container">
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className="bg-white/10 backdrop-blur-sm rounded-3xl overflow-hidden group hover:bg-white/15 transition-all duration-500"
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.8 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.8 }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                {/* Project Image */}
                <div className="relative h-64 bg-gradient-to-br from-gray-700 to-gray-800 overflow-hidden">
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${project.color} flex items-center justify-center text-8xl`}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {project.image}
                  </motion.div>
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${
                      project.status === 'Completed' ? 'bg-green-500' :
                      project.status === 'Under Construction' ? 'bg-yellow-500' : 'bg-blue-500'
                    }`}>
                      {project.status}
                    </span>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-700">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
                      {project.title}
                    </h3>
                    <span className="text-cyan-400 font-bold text-sm">{project.year}</span>
                  </div>

                  <p className="text-gray-300 mb-6 leading-relaxed">{project.description}</p>

                  {/* Project Details */}
                  <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                    <div>
                      <span className="text-gray-400">Area:</span>
                      <p className="text-white font-semibold">{project.area}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Location:</span>
                      <p className="text-white font-semibold">{project.location}</p>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.features.map((feature, featureIndex) => (
                      <motion.span
                        key={featureIndex}
                        className="px-3 py-1 bg-gray-700/50 text-gray-300 rounded-full text-xs font-medium"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                        transition={{ delay: 1.0 + index * 0.1 + featureIndex * 0.05, duration: 0.3 }}
                        whileHover={{ scale: 1.05, backgroundColor: '#667eea', color: 'white' }}
                      >
                        {feature}
                      </motion.span>
                    ))}
                  </div>

                  {/* View Details Button */}
                  <motion.button
                    className="w-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold py-3 rounded-xl hover:from-cyan-500 hover:to-blue-500 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    View Project Details
                    <ExternalLink className="ml-2 group-hover:rotate-12 transition-transform duration-300" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container">
          <motion.div
            className="text-center bg-white/10 backdrop-blur-sm rounded-3xl p-12 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            <h3 className="text-3xl font-bold text-white mb-6">Ready to Start Your Project?</h3>
            <p className="text-gray-300 text-lg mb-8">
              Let's discuss how we can bring your architectural vision to life. 
              From initial concept to final construction, we're here to guide you every step of the way.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold py-4 px-8 rounded-xl hover:from-cyan-500 hover:to-blue-500 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start a Project
              </motion.button>
              <motion.button
                className="border border-white/30 text-white font-semibold py-4 px-8 rounded-xl hover:bg-white/10 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Schedule Consultation
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default ProjectsPage
