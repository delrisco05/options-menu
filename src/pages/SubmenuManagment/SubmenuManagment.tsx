import { ModalContent } from "@/contents";
import TableAccordionContent from "@/contents/TableAcordion/TableAcordionContent";
import { DataInterface } from "@/interfaces";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setSystemStore } from "@/redux/slices";
import { useNavigate } from "react-router-dom";
import { ContentWrapper, ModalWindow } from "remoteUtilities/components-mf-utilities";
import iconCreate from '../../assets/iconCreate.svg';

export const SubmenuManagment: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const dataModule = useAppSelector((state) => state.dataModule);
  const dataSubmenu = useAppSelector((state) => state.dataSubmenu);
  const dataSystem = useAppSelector((state) => state.dataSystem);
  const findItemById: any = (items: DataInterface[], id: number) => {
    for (const item of items) {
      if (item.id === id) {
        return item;
      }

      if (item.items) {
        const foundItem = findItemById(item.items, id);
        if (foundItem) {
          return foundItem;
        }
      }
    }
    return null;
  };
  const data: DataInterface = findItemById(dataModule.items, dataSubmenu.id);

  return (
    <>
      <ContentWrapper title={data.name} className="mt-14 max-w-1091p w-full" actionBack={() => navigate('/menu-management/menus')}>
        <div className="mb-6 overflow-hidden rounded-lg border border-red-400 w-full mx-auto flex flex-col">
        <div className="flex justify-end items-center gap-6 mr-3 p-2">
          <button onClick={() => dispatch(setSystemStore({ modal: true, modalType: 'submenu' }))} className="text-light-orange font-bold text-base flex gap-2 items-center">
            Agregar opción de menu
            <img src={iconCreate} alt="create" className="icon-red" style={{ width: '32px', height: '20px' }} />
          </button>
        </div>
          <TableAccordionContent items={data.items} />
        </div>
      </ContentWrapper>

      {dataSystem.modal && (
        <ModalWindow>
          <ModalContent />
        </ModalWindow>
      )}
    </>
  )
}