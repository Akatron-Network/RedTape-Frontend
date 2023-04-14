import React from 'react'
import PageSubTitle from '../items/PageSubTitle'
import { useTasks } from '../../context/TasksContext'
import InputComment from '../items/InputComment';
import { useMain } from '../../context/MainContext';
import Tasks from '../../libraries/models/Tasks';

export default function TasksDropdownModal() {
  const { dropdown_button_for_modal, dropdownFuncsApply, unassignedDropdownFuncsApply, hideDropdownModal, tasksStepDescriptionRef, dropdown_modal_title } = useTasks();
  const { funcLoad } = useMain();

  return (
    <>
      <div id="tasksDropdownModal" data-modal-target="tasksDropdownModal" data-modal-backdrop="static" tabIndex="-1" aria-hidden="true" className="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden bg-modal_bg overflow-y-auto md:inset-0 h-modal md:h-full">
        <div className="relative w-full h-full max-w-lg md:h-auto">
          <div className="relative bg-ghost_white rounded-sm shadow">
            <div className="flex items-start justify-between px-5 pt-3 pb-0 border-b border-steel_blue_light rounded-t">
              <PageSubTitle title={dropdown_modal_title} />
              <button type="button" onClick={() => hideDropdownModal()} className="text-oxford_blue bg-transparent text-base hover:bg-gray-300 hover:text-mn_blue transition duration-200 rounded-sm p-1.5 ml-auto inline-flex items-center"><i className="fa-solid fa-xmark"></i></button>
            </div>
            <div className="p-5 grid grid-cols-1 gap-[1px]">

              <div className='col-span-2'><InputComment type={"text"} name={"Açıklama"} reference={tasksStepDescriptionRef} /></div>
              
            </div>

            <div className="flex items-center px-5 py-3 space-x-2 border-t border-steel_blue_light rounded-b justify-end">
              <button type="button" className="save-btn ml-2 float-right"
                onClick={() => 
                  {dropdown_button_for_modal.constructor === Tasks ? 
                    funcLoad(dropdownFuncsApply, dropdown_button_for_modal.data, dropdown_button_for_modal.title)
                    :
                    funcLoad(unassignedDropdownFuncsApply, dropdown_button_for_modal.data, dropdown_button_for_modal.title)
                  }
                }
              >
                <i className="fa-solid fa-floppy-disk mr-2"></i>{dropdown_button_for_modal.title}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
