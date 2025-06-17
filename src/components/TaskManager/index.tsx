import { useState } from "react";
import { Button, Pagination, Stack } from "@mui/material";
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
  const { tasks, setTasks, meta } = usePaginationTask(
    "server/todoget",
    page,
    6
  );

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
    <div className="p-4 sm:p-6 md:p-10 bg-gray-50">
      <div className="min-h-[1000px]">
        <div className="md:hidden fixed bottom-4 right-4 z-10">
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
            onClick={() => setModal(true)}
          >
            Add task
          </Button>
        </div>

        <div className="flex flex-col md:flex-row md:justify-around gap-6 md:gap-4">
          {SelectOption.map((it) => {
            const filterTask = tasks.filter(
              (task) => task.priority === it.label
            );
            return (
              <div key={it.label} className="w-full md:w-80 md:mr-4">
                <PriorityTask type={it} />
                <div className="mt-3 space-y-3">
                  {filterTask.map((item) => (
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
                  ))}
                  {filterTask.length === 0 && (
                    <div className="text-gray-400 text-center py-4 border border-dashed border-gray-300 rounded-lg">
                      No tasks
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          <div className="hidden md:block">
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
              onClick={() => setModal(true)}
            >
              Add task
            </Button>
          </div>
        </div>

        <NewTask
          modal={modal}
          setModal={setModal}
          control={control}
          SelectOption={SelectOption}
          setTasks={setTasks}
          handleSubmit={handleSubmit}
          reset={reset}
        />
      </div>

      <div>
        {meta && meta.totalPages > 1 && tasks && (
          <Stack spacing={2} alignItems="center" mt={4}>
            <Pagination
              count={meta.totalPages}
              page={page}
              onChange={(_, value) => setPage(value)}
              color="primary"
              shape="rounded"
              showFirstButton
              showLastButton
            />
          </Stack>
        )}
      </div>
    </div>
  );
};
