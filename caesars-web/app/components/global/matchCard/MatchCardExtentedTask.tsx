"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import statusComplete from "../../../assets/icons/status-complete.svg";
import statusInComplete from "../../../assets/icons/status-incomplete.svg";
import { get } from "@/app/apiIntegrations/fetcher";
import LoadingComponent from "../LoadingComponent";

type MatchCardExtentedTaskProps = {
  taskProcess?: any;
  matchId?: any;
  primary?: boolean;
  style?: {};
};

const MatchCardExtentedTask = (props: MatchCardExtentedTaskProps) => {
  const { taskProcess, matchId, primary = true, ...prop } = props;
  const [task, setTask] = useState<any>([]);
  const [isTaskLoading, setisTaskLoading] = useState(false);

  useEffect(() => {
    loadTaskList(matchId);
  }, [matchId]);

  async function loadTaskList(matchId: any) {
    if (matchId) {
      setisTaskLoading(true);
      try {
        const res = await get(`matches/${matchId}/task-list`);
        const order1 = res?.data?.filter(
          (t: any) => t.name === "create_roster"
        );
        const order2 = res?.data?.filter(
          (t: any) => t.name === "create_probable_lineups"
        );
        console.log("loadTaskList", res);

        if (res.data.length > 0) {
          setTask([order1[0], order2[0]]);
          setisTaskLoading(false);
        } else {
          setTask([]);
        }
      } catch (e) {
        console.warn(e);
      }
    }
  }

  return (
    <div>
      {isTaskLoading && (
        <div className="">
          <LoadingComponent
            text="Please wait tasks is loading"
            style={{
              fontSize: 14,
            }}
          />
        </div>
      )}
      {!isTaskLoading && task.length === 0 && (
        <div className="text-[#ccc] text-sm ml-2.5 my-2.5">
          No tasks available yet!
        </div>
      )}
      {!isTaskLoading &&
        task &&
        task?.map((task: any, i: any) => {
          const task_name = task?.name.split("_");
          const status = task?.status === 0 ? statusInComplete : statusComplete;
          return (
            <div key={i} className="flex items-center my-3.5" {...prop}>
              {primary ? (
                <div>
                  <Image src={status} alt="" />
                </div>
              ) : (
                <p className="w-10 h-9 bg-[#F5F5F7] rounded-[10px] flex justify-center items-center text-sm font-semibold">
                  {i + 1}
                </p>
              )}

              <div className="w-full flex items-center justify-between ml-4">
                <p className="text-sm fomt-medium text-[#141522] capitalize flex items-center gap-1">
                  {task_name?.map((name: any, i: any) => (
                    <p key={i}>{name}</p>
                  ))}
                </p>
                {!primary && (
                  <p className="text-base font-medium text-[#4285F4]">
                    {task?.taskPercentage || 0}%
                  </p>
                )}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default MatchCardExtentedTask;
