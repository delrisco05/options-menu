import { DataInterface } from '@/interfaces';
import React, { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { NoData } from '../NoData';
import { useAppDispatch } from '@/redux/hooks';
import { deleteModulesStore, deleteSubmenusStore, moveModulesStore, setExtraItemStore, setSystemStore } from '@/redux/slices';
import { ModalAlertProps } from '@/Declares/declares';
import { ModalAlert } from 'remoteUtilities/components-mf-utilities';
import { useNavigate } from 'react-router-dom';
import iconEdit from '../../assets/iconEdit.svg';
import iconDelete from '../../assets/IconDelete.svg';
import iconCreate from '../../assets/iconCreate.svg';
import iconArrowRight from '../../assets/iconArrowRight.svg';
import iconDragHandle from '../../assets/iconDragHandle.svg';
import { deleteModules, moveModules } from '@/services/moduleService';

interface TableAccordionContentProps {
  items: DataInterface[];
}

const TableAccordionContent: React.FC<TableAccordionContentProps> = ({ items = [] }) => {
  const renderMenu = (menuItems: DataInterface[], level: number = 0) => {
    return menuItems.map((item) => (
      <MenuItemComponent key={item.id} item={item} level={level} />
    ));
  };

  if (!items || items.length === 0) {
    return <NoData />;
  }

  return <div className="menu">{renderMenu(items)}</div>;
};

interface MenuItemProps {
  item: DataInterface;
  level: number;
}

const MenuItemComponent: React.FC<MenuItemProps> = ({ item, level }) => {
  const [modalContent, setModalContent] = useState<ModalAlertProps | null>(null);
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'MENU_ITEM',
    item: { id: item.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const handleDrop = async (idFrom: number ) => {
    if (idFrom !== item.id && item.collapsible) {
      dispatch(setSystemStore({loading: true}));   
      try {
        await moveModules(idFrom, item.id!, level);
        dispatch(moveModulesStore({ idFrom: idFrom, idTo: item.id! }));
        dispatch(setSystemStore({ toast: true, toastMessage: 'Submenú movido exitosamente' }));
        dispatch(setSystemStore({loading: false}));
      } catch (error: any) {
        console.error(error);
        dispatch(setSystemStore({loading: false}));
        setModalContent({
          title: "Ocurrió un error inesperado",
          message: `Vuelve a intentarlo, si el error persiste comunícate a xxxxxx@nuamx.com o 55555555 `,
          textSuccess: 'Reintentar',
          variant: 'error',
          onClick: () => setModalContent(null)
        });
      } finally {
          dispatch(setSystemStore({loading: false}));
      }
    }
  };

  const [, drop] = useDrop({
    accept: 'MENU_ITEM',
    drop: (draggedItem: { id: number }) => {
      handleDrop(draggedItem.id);
    },
  });

  const toggleOpen = () => setIsOpen(!isOpen);

  const handleDelete = async (data: DataInterface) => {
    dispatch(setSystemStore({loading: true}));
    try {
      const id: number = data.id!;
      await deleteModules(data);
      dispatch(deleteModulesStore({id}));
      dispatch(deleteSubmenusStore({id}));
      setModalContent(null);
      dispatch(setSystemStore({ toast: true, toastMessage: 'Submenú eliminado exitosamente' }));
      dispatch(setSystemStore({loading: false}));
    } catch (error: any) {
      console.error(error);
      dispatch(setSystemStore({loading: false}));
      setModalContent({
        title: "Ocurrió un error inesperado",
        message: `Vuelve a intentarlo, si el error persiste comunícate a xxxxxx@nuamx.com o 55555555 `,
        textSuccess: 'Reintentar',
        variant: 'error',
        onClick: () => setModalContent(null)
      });
    } finally {
        dispatch(setSystemStore({loading: false}));
    }
  }

  const deleteMenu = (data: DataInterface) => {
    setModalContent({
      title: "¿Deseas eliminar menú?",
      message: `Al eliminar este submenú se eliminarán todas las acciones y sub menús que este contenga`,
      textSuccess: 'Eliminar',
      variant: 'warning',
      onClick: () => handleDelete(data),
      textCancel: 'Volver',
      handleCancel: () => setModalContent(null)
    });
  };

  return (
    <>
      <div ref={drag} className={`menu-item pl-${level * 4} ${isDragging ? 'opacity-50' : ''}`}>
        <div className="flex items-center">
          <div className="flex items-center" >
            <span className={`mr-2 transform ${isOpen ? 'rotate-90' : ''}`}>
              {item.collapsible ? (
                <img src={iconArrowRight} className='cursor-pointer' onClick={toggleOpen} alt="menu" style={{ width: '32px', height: '20px' }} />
              ) : (
                <span style={{ display: 'inline-block', width: '30px' }}></span>
              )}
            </span>

          </div>
          <div ref={drop} className="border h-16 container mx-auto flex items-center justify-between">
            <div className="text-left flex justify-between items-center">
              <img src={iconDragHandle} alt="drag" style={{ width: '32px', height: '20px' }} />
              <span className="ml-2">{item.name}</span>
            </div>
            <div className="text-right flex items-center">
              {item.url ? (
                <div className="bg-gray-100 rounded-lg pt-2 pb-2 pl-4 pr-4">{item.url}</div>
              ) : (
                <button onClick={() => {
                  dispatch(setExtraItemStore({
                    id: item.id,
                    name: item.name,
                    level: item.level,
                    url: item.url
                  }));
                  dispatch(setSystemStore({ modal: true, modalType: 'extraitem' }));
                }}>
                  <img src={iconCreate} alt="create" className='icon-hover' style={{ width: '40px', height: '20px' }} />
                </button>
              )}

              <button onClick={() => deleteMenu(item)}>
                <img src={iconDelete} alt="delete" className='icon-hover' style={{ width: '40px', height: '19px' }} />
              </button>
              <button onClick={() => {
                dispatch(setExtraItemStore({
                  id: item.id,
                  name: item.name,
                  level: item.level,
                  url: item.url
                }));
                navigate('/menu-management/editsubmenu');
              }}>
                <img src={iconEdit} alt="edit" className='icon-hover' style={{ width: '40px', height: '20px' }} />
              </button>
            </div>
          </div>
        </div>
        {isOpen && item.items && (
          <div className="ml-4">
            {item.items.map((child) => (
              <MenuItemComponent key={child.id} item={child} level={level + 1} />
            ))}
          </div>
        )}
      </div>
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
  );



};

export default TableAccordionContent;
