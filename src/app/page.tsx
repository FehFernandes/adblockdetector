"use client";

import React, { useState, useEffect } from 'react';
import { useDetectAdBlock } from "adblock-detect-react";
import { Shield, ShieldAlert, X, ExternalLink, CheckCircle, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdBlockDetector = () => {
  const adBlockDetected = useDetectAdBlock();
  const [showPopup, setShowPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      if (adBlockDetected) {
        setShowPopup(true);
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [adBlockDetected]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-100 to-indigo-100 p-8 font-sans">
      <main className="max-w-4xl mx-auto">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-6">
            <Shield className="w-20 h-20 text-indigo-600" />
          </div>
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Proteção de Conteúdo
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Nosso conteúdo é mantido através de anúncios responsáveis. 
            Por favor, considere nos apoiar desativando seu bloqueador.
          </p>
        </motion.div>

        {/* Status Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-16"
        >
          <div className={`bg-white border-2 ${adBlockDetected ? 'border-red-400' : 'border-green-400'} rounded-xl p-6 shadow-lg transition-all duration-300 ${isLoading ? 'opacity-50' : 'opacity-100'}`}>
            <div className="flex items-center gap-6">
              {adBlockDetected ? (
                <AlertCircle className="h-12 w-12 text-red-500" />
              ) : (
                <CheckCircle className="h-12 w-12 text-green-500" />
              )}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {isLoading ? (
                    "Verificando status..."
                  ) : adBlockDetected ? (
                    "AdBlock Detectado"
                  ) : (
                    "Tudo certo!"
                  )}
                </h3>
                <p className="text-lg text-gray-700">
                  {isLoading ? (
                    "Por favor, aguarde enquanto verificamos seu navegador..."
                  ) : adBlockDetected ? (
                    "Detectamos que você está usando um bloqueador de anúncios"
                  ) : (
                    "Obrigado por apoiar nosso conteúdo!"
                  )}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Content Section */}
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-xl p-8 shadow-xl"
          >
            <h2 className="text-2xl font-bold mb-6 text-indigo-700">Por que desativar o AdBlock?</h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="mt-1 w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                  <div className="w-3 h-3 rounded-full bg-indigo-600"></div>
                </div>
                <span className="text-lg text-gray-700">Ajuda a manter nosso conteúdo gratuito</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                  <div className="w-3 h-3 rounded-full bg-indigo-600"></div>
                </div>
                <span className="text-lg text-gray-700">Permite que continuemos produzindo conteúdo de qualidade</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                  <div className="w-3 h-3 rounded-full bg-indigo-600"></div>
                </div>
                <span className="text-lg text-gray-700">Garante o funcionamento adequado do site</span>
              </li>
            </ul>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-white rounded-xl p-8 shadow-xl"
          >
            <h2 className="text-2xl font-bold mb-6 text-indigo-700">Como desativar</h2>
            <div className="space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                Para desativar o AdBlock, clique no ícone do AdBlock na barra de extensões
                e selecione "Pausar neste site". É rápido e fácil!
              </p>
              <button className="w-full bg-indigo-600 text-white py-4 px-6 rounded-xl text-lg font-semibold hover:bg-indigo-700 transition-colors duration-300 flex items-center justify-center gap-3 shadow-md hover:shadow-lg">
                <ExternalLink className="w-6 h-6" />
                Tutorial em vídeo
              </button>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Modal */}
      <AnimatePresence>
        {showPopup && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative"
            >
              <button 
                onClick={() => setShowPopup(false)}
                className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="text-center">
                <div className="flex justify-center mb-6">
                  <ShieldAlert className="w-16 h-16 text-red-500" />
                </div>
                <h2 className="text-3xl font-bold mb-4 text-gray-900">AdBlock Detectado</h2>
                <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                  Para continuar navegando em nosso site, por favor desative seu bloqueador
                  de anúncios. Nós utilizamos anúncios não intrusivos para manter nosso
                  conteúdo gratuito e de qualidade.
                </p>
                <button
                  onClick={() => setShowPopup(false)}
                  className="w-full bg-indigo-600 text-white py-4 px-6 rounded-xl text-lg font-semibold hover:bg-indigo-700 transition-colors duration-300 shadow-md hover:shadow-lg"
                >
                  Entendi, vou desativar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdBlockDetector;

