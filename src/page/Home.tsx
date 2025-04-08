"use client";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/Animations/ui/button";
import {
  MessageSquare,
  Calendar,
  BarChart2,
  Users,
  Award,
  Shield,
  Zap,
  ArrowRight,
} from "lucide-react";
import { AnimatedBackground } from "../components/Animations/AnimatedBackground";
import { Share2 } from "lucide-react";

export function Home() {
  const router = useNavigate();

  const mainHeader = [
    { label: "Інструкція", path: "/instructions" },
    { label: "Допомога", path: "/help" },
    { label: "Підписка", path: "/subscription" },
    { label: "Відгуки", path: "/reviews" },
  ];
  const mainContent = [
    {
      icon: <Users className="h-8 w-8" />,
      title: "10,000+ користувачів",
      desc: "Довіряють нашій платформі для щоденної роботи з контентом",
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "98% задоволених клієнтів",
      desc: "Високий рівень задоволеності та позитивні відгуки",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Безпека даних",
      desc: "Надійний захист вашої інформації та контенту",
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Швидкість роботи",
      desc: "Оптимізована продуктивність для комфортної роботи",
    },
  ];
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 overflow-hidden relative">
      <AnimatedBackground />

      <header className="bg-white bg-opacity-90 backdrop-blur-sm p-4 shadow-sm relative z-10">
        <div className="container mx-auto flex items-center justify-between">
          <motion.div
            className="mr-2 w-6 h-6"
            animate={{
              rotate: [0, 10, -10, 10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: 5,
            }}
          >
            <Share2 className="h-6 w-6" />
            <motion.div>CoolCompany</motion.div>
          </motion.div>

          <nav className="hidden md:flex space-x-6">
            <nav className="hidden md:flex space-x-6">
              {mainHeader.map((item, i) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * i }}
                >
                  <Link
                    to={item.path}
                    className="text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </nav>

          <div className="flex items-center space-x-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Button
                className="bg-indigo-600 hover:bg-indigo-700"
                onClick={() => router("/auth")}
              >
                Login
              </Button>
            </motion.div>
          </div>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center relative z-10">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <motion.h1
              className="text-3xl font-bold text-center mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Управління контентом в соціальних мережах
            </motion.h1>

            <motion.p
              className="text-lg text-center text-gray-600 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Ефективна платформа для створення, планування та аналізу контенту
              у соціальних мережах
            </motion.p>

            <motion.div
              className="flex justify-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="bg-indigo-600 hover:bg-indigo-700 mr-4">
                  Спробувати безкоштовно
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="outline">Дізнатися більше</Button>
              </motion.div>
            </motion.div>

            <motion.div
              className="mb-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7 }}
            >
              <motion.h2
                className="text-2xl font-bold text-center mb-12"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Чому обирають нашу платформу
              </motion.h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                {mainContent.map((stat, i) => (
                  <motion.div
                    key={i}
                    className="bg-white rounded-lg shadow-md p-6 flex items-start"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                    whileHover={{
                      y: -5,
                      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <motion.div
                      className="text-indigo-600 mr-4 mt-1"
                      initial={{ scale: 0.5 }}
                      animate={{ scale: 1 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.6 + i * 0.1,
                        type: "spring",
                        stiffness: 200,
                      }}
                    >
                      {stat.icon}
                    </motion.div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">
                        {stat.title}
                      </h3>
                      <p className="text-gray-600 text-sm">{stat.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button className="bg-indigo-600 hover:bg-indigo-700 inline-flex items-center">
                    Дізнатися більше про переваги
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Animated Feature Icons */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              {[
                {
                  icon: <MessageSquare className="h-10 w-10" />,
                  title: "Створення контенту",
                  desc: "Зручні інструменти для створення привабливого контенту",
                },
                {
                  icon: <Calendar className="h-10 w-10" />,
                  title: "Планування публікацій",
                  desc: "Автоматичне планування постів у зручний час",
                },
                {
                  icon: <BarChart2 className="h-10 w-10" />,
                  title: "Аналітика",
                  desc: "Детальна статистика та аналіз ефективності",
                },
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  className="bg-white p-6 rounded-lg shadow-md text-center"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  whileHover={{
                    y: -5,
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <motion.div
                    className="text-indigo-600 mx-auto mb-4"
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.6 + i * 0.1,
                      type: "spring",
                      stiffness: 200,
                    }}
                  >
                    {feature.icon}
                  </motion.div>
                  <h3 className="font-semibold text-lg mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white bg-opacity-90 backdrop-blur-sm p-6 shadow-inner relative z-10">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="font-semibold mb-3">Про нас</h3>
              <p className="text-gray-600 text-sm">
                Платформа для ефективного управління контентом у соціальних
                мережах, розроблена в рамках дипломної роботи.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="font-semibold mb-3">Корисні посилання</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Документація
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Блог
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Контакти
                  </a>
                </li>
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="font-semibold mb-3">Зв'язатися з нами</h3>
              <p className="text-gray-600 text-sm">
                Email: info@coolcompany.com
                <br />
                Телефон: +380 12 345 6789
              </p>
            </motion.div>
          </div>
          <motion.div
            className="border-t border-gray-200 mt-8 pt-6 text-center text-sm text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            &copy; {new Date().getFullYear()} CoolCompany. Усі права захищені.
          </motion.div>
        </div>
      </footer>
    </div>
  );
}
