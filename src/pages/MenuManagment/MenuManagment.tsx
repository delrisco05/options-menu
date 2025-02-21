import { ModalAlertProps } from "@/Declares/declares";
import { DataInterface, DataStoreInterface } from "@/interfaces";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { deleteMenusStore, deleteModulesStore, setSubmenusStore, setSystemStore } from "@/redux/slices";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ContentWrapper, ModalAlert, NewTable2 } from "remoteUtilities/components-mf-utilities";
import iconDelete from '../../assets/IconDelete.svg';
import iconCreate from '../../assets/iconCreate.svg';
import { deleteModules } from "@/services/moduleService";
import iconEdit from '../../assets/iconEdit.svg';

export const MenuManagment = () => {
  const [modalContent, setModalContent] = useState<ModalAlertProps | null>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const dataModule = useAppSelector((state) => state.dataModule);
  const dataMenu = useAppSelector((state) => state.dataMenu);

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
  const data: DataInterface = findItemById(dataModule.items, dataMenu.id);

  const setSubmenus = (id: number, name: string, level: number, items: DataInterface[] = []) => {
    const dataStoreInterface: DataStoreInterface = {
      id,
      name,
      level,
      items
    }
    dispatch(setSubmenusStore(dataStoreInterface));
  };

  const handleDelete = async (data: DataInterface) => {
    dispatch(setSystemStore({ loading: true }));
    try {
      const id: number = data.id!;
      await deleteModules(data);
      dispatch(deleteModulesStore({ id }));
      dispatch(deleteMenusStore({ id }));
      setModalContent(null);
      dispatch(setSystemStore({ toast: true, toastMessage: 'Menú eliminado exitosamente' }));
      dispatch(setSystemStore({ loading: false }));
    } catch (error: any) {
      console.error(error);
      dispatch(setSystemStore({ loading: false }));
      setModalContent({
        title: "Ocurrió un error inesperado",
        message: `Vuelve a intentarlo, si el error persiste comunícate a xxxxxx@nuamx.com o 55555555 `,
        textSuccess: 'Reintentar',
        variant: 'error',
        onClick: () => setModalContent(null)
      });
    } finally {
      dispatch(setSystemStore({ loading: false }));
    }
  }

  const deleteMenu = (data: DataInterface) => {
    setModalContent({
      title: "¿Deseas eliminar menú?",
      message: `Al eliminar este menú se eliminarán todas las acciones y sub menús que este contenga`,
      textSuccess: 'Eliminar',
      variant: 'warning',
      onClick: () => handleDelete(data),
      textCancel: 'Volver',
      handleCancel: () => setModalContent(null)
    });
  };

  const handleAction = (action: { type: string; url?: string }) => {
    if (action.type === 'navigate' && action.url) {
      navigate(action.url);
    }
  };

  const columnsModules = [
    {
      width: 80,
      name: "Ménu",
      render: (row: { name: string }) => <span> {row?.name} </span>,
    },
    {
      width: 20,
      name: "",
      render: (row: DataInterface) =>
        <div className="flex">
          <button onClick={() => deleteMenu(row)}><img src={iconDelete} className="icon-red" alt="delete" style={{ width: '32px', height: '20px' }} /></button>
          <Link
            to={`../submenus`}
            className="text-red-500"
            onClick={() => setSubmenus(row.id!, row.name, row.level, row.items!)}
          >Ver más</Link>
          <Link
            to={`../addmenu`}
            className="text-red-500"
            onClick={() => 
            {
              setSubmenus(row.id!, row.name, row.level, row.items!);
              dispatch(setSystemStore({ action: "update" }));
            }}
          ><img src={iconEdit} alt="edit" className="icon-red" style={{ width: '40px', height: '20px' }} /></Link>
        </div>
    },
  ];

  const headerActionsModule = [
    {
      label: 'Agregar menú',
      type: 'navigate',
      url: '../addmenu',
      icon: (<img src={iconCreate} alt="create" className="icon-red" style={{ width: '32px', height: '20px' }} />)
    }
  ];

  return (
    <>
      <ContentWrapper title={dataMenu.name} className="mt-14" actionBack={() => navigate('/menu-management/modules')}>
        <NewTable2 columns={columnsModules} data={data.items} headerActions={headerActionsModule} onAction={handleAction} />
      </ContentWrapper>

      {modalContent && (
        <ModalAlert
          title={modalContent.title}
          textSuccess={modalContent.textSuccess}
          message={modalContent.message}
          variant={modalContent.variant}
          onClick={modalContent.onClick}
          textCancel={modalContent.textCancel}
          handleCancel={modalContent.handleCancel}
        />
      )}

    </>
  )
}