"use client";
import Image, { StaticImageData } from "next/image";
import Avatar from "../global/Avatar";
import { Dropdown, MenuProps, Modal } from "antd";
import angleDown from "../../assets/icons/arrow-down.svg";
import { useState } from "react";
import { toastProps } from "../global/toast/Toast";

type Props = {
  user?: any;
  id?: any;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  primary?: boolean;
  team1_image: string | StaticImageData;
  team1_short_name: string;
  team2_image: string | StaticImageData;
  team2_short_name: string;
  adminSave?: (
    match_id: any,
    task_name: any,
    is_approved: boolean,
    comment: string,
    message?: string
  ) => void;
  toastPopup?: boolean;
  setToastPopup?: React.Dispatch<React.SetStateAction<boolean>>;
  toastDetails?: {};
  setToastDetails?: React.Dispatch<React.SetStateAction<toastProps>>;
};

const RejectModal = (props: Props) => {
  const {
    id,
    open,
    setOpen,
    team1_image,
    team1_short_name,
    team2_image,
    team2_short_name,
    adminSave,
    toastPopup,
    setToastPopup,
    toastDetails,
    setToastDetails,
  } = props;
  const [rejectReason, setRejectReason] = useState({
    task: "",
    comment: "",
  });

  const rejectItems: MenuProps["items"] = [
    {
      key: "0",
      label: (
        <div className="" style={{ padding: 10 }}>
          Create Roster
        </div>
      ),
      onClick: (e) => {
        setRejectReason({
          ...rejectReason,
          task: "create_roster",
        });
      },
    },
    {
      key: "1",
      label: <div style={{ padding: 10 }}>Create Probable Lineups</div>,
      onClick: (e) => {
        setRejectReason({
          ...rejectReason,
          task: "create_probable_lineups",
        });
      },
    },

    {
      key: "2",
      label: <div style={{ padding: 10 }}>Create Player Props Markets</div>,
      onClick: (e) => {
        setRejectReason({
          ...rejectReason,
          task: "create_player_props_markets",
        });
      },
    },
  ];

  return (
    <Modal open={open} footer={false} closeIcon={false} centered>
      <div className="p-5">
        <div className="flex justify-center items-center">
          <Avatar
            name={team1_short_name}
            image={team1_image}
            width={50}
            height={50}
          />
          <p className="px-3 text-sm font-semibold">vs</p>
          <Avatar
            name={team2_short_name}
            image={team2_image}
            width={50}
            height={50}
          />
        </div>
        <div className="mt-5 rounded-[20px] flex flex-col items-center justify-center">
          <p className="text-xl font-bold text-[#FB532E]">
            Are you sure want to Reject?
          </p>
          {/* <div className='w-full h-full mt-5 p-5 rounded-[20px] border border-[#FFB8B8]'>
            <Dropdown menu={{ items: rejectItems }} trigger={['click']}>
              <div
                className={`${
                  rejectReason.task !== '' ? 'text-black' : 'text-[#B6B6B6]'
                } w-full h-10 px-3 flex items-center justify-between border-b`}
              >
                {rejectReason.task !== '' ? (
                  <div className='flex gap-1'>
                    {rejectReason.task.split('_').map((r) => (
                      <p className='capitalize'>{r}</p>
                    ))}
                  </div>
                ) : (
                  'Select the Task'
                )}
                <Image src={angleDown} alt='down_arrow' className='grayscale' />
              </div>
            </Dropdown>
            <textarea
              placeholder={
                rejectReason.comment !== '' ? rejectReason.comment : 'Comments'
              }
              className='w-full h-[110px] p-2 mt-5 border border-[#ECECEC] resize-none'
              onChange={(e) =>
                setRejectReason({ ...rejectReason, comment: e.target.value })
              }
            >
              {rejectReason.comment}
            </textarea>
            <div className='flex justify-end text-xs items-center gap-5 mt-4'>
              <button
                className={`px-4 py-2 rounded-full text-[#14171C] font-normal border border-[#FB532E]`}
                onClick={() => {
                  setOpen(false);
                  setRejectReason({ task: '', comment: '' });
                }}
              >
                Cancel
              </button>
              <button
                className={`px-4 py-2 rounded-full text-white font-bold bg-[#FB532E] border border-[#FB532E] ${
                  rejectReason.task !== '' && rejectReason.comment !== ''
                    ? 'opacity-none cursor-pointer'
                    : 'opacity-50 cursor-not-allowed'
                }`}
                onClick={() => {
                  if (rejectReason.task !== '' && rejectReason.comment !== '')
                    if (adminSave) {
                      adminSave(
                        id,
                        rejectReason.task,
                        false,
                        rejectReason.comment,
                        'Match rejected successfully'
                      );
                      setOpen(false);
                      setRejectReason({ task: '', comment: '' });
                    }
                }}
              >
                Yes, Submit
              </button>
            </div>
          </div> */}
          <div className="flex justify-end text-xs items-center gap-5 mt-10">
            <button
              className={`px-4 py-2 rounded-full text-[#14171C] font-normal border border-[#FB532E]`}
              onClick={() => {
                setOpen(false);
              }}
            >
              Cancel
            </button>
            <button
              className={`px-4 py-2 rounded-full text-white font-bold bg-[#FB532E] border border-[#FB532E]`}
              onClick={() => {
                if (adminSave) {
                  adminSave(
                    id,
                    "create_roster",
                    false,
                    "Match rejected successfully"
                  );
                  setOpen(false);
                  setRejectReason({ task: "", comment: "" });
                }
              }}
            >
              Yes, Reject
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default RejectModal;
