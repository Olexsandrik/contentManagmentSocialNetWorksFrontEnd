import { useState, useMemo, useCallback, useEffect } from "react";
import {
  Button,
  Pagination,
  Stack,
  CircularProgress,
  Alert,
  Skeleton,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { PriorityMeta, type Task } from "../../app/type";
import { PriorityTask } from "../PriorityTask";
import { CardTask } from "../CardTask";
import { useForm } from "react-hook-form";
import { type AddTasks, addTasks } from "../Auth/zodValidations";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddTasks as NewTask } from "../AddTasks";
import { usePaginationTask } from "../../servers/usePaginationTask";

export const TaskManager = () => {
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState(false);
  const { tasks, setTasks, meta, isLoading, error } = usePaginationTask(
    "server/todoget",
    page,
    6
  );

  // Reset to page 1 if current page is beyond available pages
  useEffect(() => {
    if (meta && meta.totalPages > 0 && page > meta.totalPages) {
      setPage(1);
    }
  }, [meta, page]);

  // Memoized task filtering for better performance - server already provides paginated data
  const tasksByPriority = useMemo(() => {
    if (!tasks) return { HIGH_PRIORITY: [], IN_PROGRESS: [], COMPLETED: [] };

    return {
      HIGH_PRIORITY: tasks.filter(
        (task: Task) => task.priority === "HIGH_PRIORITY"
      ),
      IN_PROGRESS: tasks.filter(
        (task: Task) => task.priority === "IN_PROGRESS"
      ),
      COMPLETED: tasks.filter((task: Task) => task.priority === "COMPLETED"),
    };
  }, [tasks]);

  // Callback to handle page changes
  const handlePageChange = useCallback(
    (event: React.ChangeEvent<unknown>, value: number) => {
      setPage(value);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [tasks]
  );

  // Callback to handle modal open/close
  const handleModalToggle = useCallback((isOpen: boolean) => {
    setModal(isOpen);
  }, []);

  const { control, handleSubmit, getValues, setValue, reset } =
    useForm<AddTasks>({
      mode: "onChange",
      resolver: zodResolver(addTasks),
      reValidateMode: "onBlur",

      defaultValues: {
        name: "",
        type: "COMPLETED",
        date: new Date(),
        desc: "",
      },
    });

  const SelectOption = [
    { value: "red", label: "HIGH_PRIORITY" },
    { value: "orange", label: "IN_PROGRESS" },
    { value: "green", label: "COMPLETED" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      <div className="p-4 sm:p-6 md:p-10 flex-grow">
        {/* Mobile Add Button */}
        <motion.div
          className="md:hidden fixed bottom-20 right-4 z-50"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#1976d2",
              color: "#fff",
              fontWeight: "bold",
              borderRadius: "50%",
              textTransform: "none",
              boxShadow: "0 8px 24px rgba(25, 118, 210, 0.4)",
              minWidth: "56px",
              height: "56px",
              "&:hover": {
                backgroundColor: "#1565c0",
                boxShadow: "0 12px 32px rgba(25, 118, 210, 0.5)",
              },
            }}
            onClick={() => handleModalToggle(true)}
          >
            +
          </Button>
        </motion.div>

        {/* Error Display */}
        {error && (
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Alert
              severity="error"
              onClose={() => window.location.reload()}
              action={
                <Button
                  color="inherit"
                  size="small"
                  onClick={() => window.location.reload()}
                >
                  Retry
                </Button>
              }
            >
              {error}
            </Alert>
          </motion.div>
        )}

        {/* Loading State */}
        {isLoading ? (
          <div className="flex flex-col md:flex-row md:justify-around gap-6 md:gap-4">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="w-full md:w-80">
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={48}
                  className="rounded-lg mb-3"
                />
                <div className="space-y-3">
                  {[...Array(2)].map((_, taskIndex) => (
                    <Skeleton
                      key={taskIndex}
                      variant="rectangular"
                      width="100%"
                      height={120}
                      className="rounded-lg"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            className="flex flex-col md:flex-row md:justify-around gap-6 md:gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {SelectOption.map((it, index) => {
              const filterTask =
                tasksByPriority[it.label as keyof typeof tasksByPriority] || [];
              return (
                <motion.div
                  key={it.label}
                  className="w-full md:w-80 md:mr-4"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <PriorityTask type={it} />
                  <div className="mt-3 space-y-3">
                    <AnimatePresence mode="popLayout">
                      {filterTask.map((item) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8, y: -20 }}
                          transition={{ duration: 0.2 }}
                          layout
                        >
                          <CardTask
                            key={item.id}
                            item={item}
                            control={control}
                            SelectOption={SelectOption}
                            setTasks={setTasks}
                            getValues={getValues}
                            handleSubmit={handleSubmit}
                            reset={reset}
                            setValue={setValue}
                            PriorityMeta={PriorityMeta}
                          />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                    {filterTask.length === 0 && (
                      <motion.div
                        className="text-gray-400 text-center py-8 border border-dashed border-gray-300 rounded-lg bg-white/50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.5 }}
                      >
                        <div className="text-2xl mb-2">📋</div>
                        <div className="text-sm">
                          No tasks in {it.label.toLowerCase().replace("_", " ")}
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              );
            })}

            <motion.div
              className="hidden md:block"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#1976d2",
                  color: "#fff",
                  fontWeight: "bold",
                  borderRadius: "12px",
                  textTransform: "none",
                  boxShadow: 3,
                  "&:hover": {
                    backgroundColor: "#1565c0",
                  },
                }}
                onClick={() => handleModalToggle(true)}
              >
                Add task
              </Button>
            </motion.div>
          </motion.div>
        )}

        <NewTask
          modal={modal}
          setModal={handleModalToggle}
          control={control}
          SelectOption={SelectOption}
          setTasks={setTasks}
          handleSubmit={handleSubmit}
          reset={reset}
        />
      </div>

      {/* Серверна пагінація - показується коли завдань більше 6 */}
      {meta && meta.total > 6 && (
        <motion.div
          className="mt-8 py-6 border-t border-gray-200 bg-white/80 backdrop-blur-sm shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Stack spacing={3} alignItems="center">
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Pagination
                count={meta.totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
                shape="rounded"
                showFirstButton
                showLastButton
                size="large"
                sx={{
                  "& .MuiPaginationItem-root": {
                    borderRadius: "8px",
                    fontWeight: 600,
                    transition: "all 0.3s ease-in-out",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 4px 12px rgba(25, 118, 210, 0.3)",
                    },
                  },
                  "& .Mui-selected": {
                    backgroundColor: "#1976d2",
                    color: "#fff",
                    transform: "scale(1.1)",
                    "&:hover": {
                      backgroundColor: "#1565c0",
                      transform: "scale(1.1) translateY(-2px)",
                    },
                  },
                }}
              />
            </motion.div>
            <motion.p
              className="text-sm text-gray-600 font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Сторінка {page} з {meta.totalPages} • Показано{" "}
              {(page - 1) * 6 + 1}-{Math.min(page * 6, meta.total)} з{" "}
              {meta.total} завдань
            </motion.p>

            {/* Debug info - видаліть після тестування */}
            {process.env.NODE_ENV === "development" && (
              <div className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded mt-2">
                Debug: Сторінка {page}, На сторінці: {tasks.length}, Всього:{" "}
                {meta.total}
              </div>
            )}
          </Stack>
        </motion.div>
      )}
    </div>
  );
};
