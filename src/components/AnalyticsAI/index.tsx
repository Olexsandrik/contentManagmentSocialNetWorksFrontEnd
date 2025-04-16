import type React from "react";
import { useState, useRef, useEffect } from "react";
import { TextField, IconButton, Typography, Avatar } from "@mui/material";
import { Send as SendIcon } from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import { Share2 } from "lucide-react";
import { useSidebar } from "../../hooks/useSidebarGet";
import { BASE_URL } from "../../constants";
import { useAnalyticsAI } from "../../hooks/useAnatylicsAI";
import { useAnalyticsAIGet } from "../../hooks/useAnatiticsAIGet";

import { useUserId } from "../../hooks/useUserId";
import { messageData } from "../../app/type";

export const AnalyticsAI = () => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { currentUser } = useSidebar("server/current");
  const userId = useUserId();

  const {
    handleSubmitAI,
    customPrompt,
    setCustomPrompt,
    loading,
    messages,
    setMessages,
  } = useAnalyticsAI("server/advice");
  const { dataFromAI } = useAnalyticsAIGet(`server/prompt/${userId}`);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    setMessages([...messages, ...dataFromAI]);
  }, [dataFromAI]);

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-gray-50 to-white">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-2 rounded-lg">
                <Share2 className="text-white" />
              </div>
              <div>
                <Typography
                  variant="h6"
                  className="font-semibold text-gray-900"
                >
                  AI Асистент
                </Typography>
                <Typography variant="caption" className="text-gray-500">
                  Powered by GPT-3.5-turbo
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow overflow-hidden flex flex-col max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex-grow overflow-y-auto mb-6 rounded-xl">
          <div className="space-y-6 p-4">
            {messages.length === 0 ? (
              <div className="h-[70vh] flex items-center justify-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-center p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-white shadow-lg border border-gray-100 max-w-md"
                >
                  <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 rounded-full inline-flex mb-4 ">
                    <Share2 />
                  </div>
                </motion.div>
              </div>
            ) : (
              <AnimatePresence>
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div
                      className={`flex max-w-[85%] items-start gap-3 ${
                        message.role === "user"
                          ? "flex-row-reverse"
                          : "flex-row"
                      }`}
                    >
                      <Avatar className="w-10 h-10 border border-gray-300 bg-indigo-100 text-indigo-600">
                        {message.role === "user" ? (
                          <img
                            src={`${BASE_URL}${currentUser?.avatarUrl ?? ""}`}
                            alt="user avatar"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 inline-flex ">
                            <Share2 />
                          </div>
                        )}
                      </Avatar>

                      <div
                        className={`p-4 rounded-2xl shadow-sm ${
                          message.role === "user"
                            ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                            : "bg-white border border-gray-100 text-gray-800"
                        }`}
                      >
                        <Typography
                          variant="body1"
                          className="whitespace-pre-wrap leading-relaxed"
                        >
                          {message.content}
                        </Typography>
                      </div>
                    </div>
                  </motion.div>
                ))}
                {loading && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="flex max-w-[85%] items-start gap-3 flex-row">
                      <div className="p-4 rounded-2xl bg-white border border-gray-100 text-gray-800 flex items-center">
                        <div className="flex space-x-1">
                          {[0, 0.2, 0.4].map((delay, i) => (
                            <motion.div
                              key={i}
                              animate={{ y: [0, -5, 0] }}
                              transition={{
                                repeat: Number.POSITIVE_INFINITY,
                                duration: 1,
                                delay,
                              }}
                              className="w-2 h-2 bg-indigo-600 rounded-full"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <div className="relative">
          <form
            onSubmit={handleSubmitAI}
            className="relative flex items-center bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500 transition-all"
          >
            <TextField
              fullWidth
              variant="standard"
              placeholder="Напишіть повідомлення..."
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              InputProps={{
                disableUnderline: true,
                className: "py-3 px-4",
              }}
              className="flex-grow"
            />
            <div className="pr-2">
              <IconButton
                type="submit"
                disabled={loading || !customPrompt.trim()}
                className={`p-2 rounded-lg transition-all ${
                  customPrompt.trim() && !loading
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-md"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                <SendIcon />
              </IconButton>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};
