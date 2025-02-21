import { ModalAlertProps } from "@/Declares/declares";
import { DataInterface, DataStoreInterface } from "@/interfaces";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { deleteModulesStore, setMenusStore, setModulesStore, setSystemStore } from "@/redux/slices";
import { deleteModules, getModules, updateModulesState } from "@/services/moduleService";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ContentWrapper, ModalAlert, NewTable2, TableSelect, Toast } from "remoteUtilities/components-mf-utilities";
import iconCreate from '../../assets/iconCreate.svg';
import iconDelete from '../../assets/IconDelete.svg';
import iconEdit from '../../assets/iconEdit.svg';

export const ModuleManagment = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const dataModule = useAppSelector((state) => state.dataModule);
    const [modalContent, setModalContent] = useState<ModalAlertProps | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newStatus, setNewStatus] = useState<{ status: string, id: string | number } | null>(null);
    const [loading, setLoading] = useState(true);
    console.log("🚀 ~ ModuleManagment ~ loading:", loading)
    const client_user = localStorage.getItem('username');
    const [isToastVisible, setIsToastVisible] = useState(false);

    const setModuleMenus = (id: number, name: string, description: string, level: number, items: DataInterface[] = []) => {
        const dataStoreInterface: DataStoreInterface = {
            id,
            name,
            description,
            level,
            items,
        }
        dispatch(setMenusStore(dataStoreInterface));
    };



    const deleteModule = (data: DataInterface) => {
        setModalContent({
            title: "¿Deseas eliminar módulo?",
            message: `Al eliminar este módulo se eliminarán todas las acciones y sub menús que este contenga`,
            textSuccess: 'Eliminar',
            variant: 'warning',
            onClick: async () => { handleDelete(data); },
            textCancel: 'Volver',
            handleCancel: () => setModalContent(null)
        });
    };

    const getAPIModules = async () => {
        dispatch(setSystemStore({ loading: true }));
        try {
            const modules = await getModules();
            const dataStoreInterface: DataStoreInterface = {
                id: 0,
                name: 'Mantenedor de menús y opciones',
                level: 1,
                items: modules
            }
            dispatch(setModulesStore(dataStoreInterface));
        } catch (error) {
            console.log(error);
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
    };
    const handleDelete = async (data: DataInterface) => {
        dispatch(setSystemStore({ loading: true }));
        try {
            const id: number = data.id!;
            await deleteModules(data);
            dispatch(deleteModulesStore({ id }));
            setModalContent(null);
            dispatch(setSystemStore({ toast: true, toastMessage: 'Modulo eliminado exitosamente' }));
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
    const updateUserStatus = async (status: string | undefined, id: string | undefined | number) => {
        let formData;
        setLoading(true);
        if (status === 'SUSPENDIDO') {
            formData = {
                status: 'SUSPENDED',
            };
        } else {
            formData = {
                status: status === 'ACTIVO' ? 'ACTIVE' : 'INACTIVE',
            };
        }
        try {
            if (client_user) {
                await updateModulesState(client_user, id, formData);
                setIsToastVisible(true);
                await getAPIModules();
            } else {
                console.error('Client user is null');
            }
        } catch (error) {
            console.log("🚀 ~ updateUserStatus ~ error:", error);
        } finally {
            setLoading(false);
            setIsModalOpen(false);
        }
    };
    const handleAction = (action: { type: string; url?: string }) => {
        if (action.type === 'navigate' && action.url) {
            navigate(action.url);
        }
    };
    const handleStatusChange = (status: string, id: string | number) => {
        setNewStatus({ status, id });
        setIsModalOpen(true);
    };

    const columnsModules = [
        {
            width: 20,
            name: "Modulo",
            render: (row: { name: string }) => <span> {row?.name} </span>,
        },
        {
            width: 40,
            name: "Descripcion",
            render: (row: { description: string }) => <span> {row?.description} </span>
        },
        {
            name: "Estado",
            width: 20,
            noHidden: true,
            render: (row: { id: string | number; status: string }) => (
                <TableSelect options={[
                    { label: 'ACTIVO', value: 'ACTIVO' },
                    { label: 'SUSPENDIDO', value: 'SUSPENDIDO' },
                    { label: 'INACTIVO', value: 'INACTIVO' }
                ]}
                    value={row.status === 'ACTIVE' ? 'ACTIVO' : row.status === 'SUSPENDED' ? 'SUSPENDIDO' : 'INACTIVO'}
                    onChange={(newStatus: string) => handleStatusChange(newStatus, row.id)}
                />
            ),
        },
        {
            width: 20,
            name: "",
            render: (row: DataInterface) =>
                <div className="hover:underline hidden group-hover:inline-block">
                    <div className="flex">
                        <button onClick={() => deleteModule(row)}>
                            <img src={iconDelete} alt="delete" className="icon-red" style={{ width: '40px', height: '20px' }} />
                        </button>
                        <Link
                            className="text-red-500"
                            to={'/menu-management/menus'}
                            onClick={() => setModuleMenus(row.id!, row.name, row.description!, row.level, row.items)}
                        >
                            Ver más
                        </Link>
                        <Link
                            className="text-red-500"
                            to={'/menu-management/addmodule'}
                            onClick={() => {
                                setModuleMenus(row.id!, row.name, row.description!, row.level, row.items);
                                dispatch(setSystemStore({ action: 'update' }));
                            }}
                        >
                            <img src={iconEdit} alt="edit" className="icon-red" style={{ width: '40px', height: '20px' }} />
                        </Link>
                    </div>
                </div>
        },
    ];

    const headerActionsModule = [
        {
            label: 'Agregar módulo',
            type: 'navigate',
            url: '../addmodule',
            icon: (<img src={iconCreate} alt="create" className="icon-red" style={{ width: '32px', height: '20px' }} />)
        }
    ];

    useEffect(() => {
        getAPIModules();
    }, []);


    return (
        <>
            <ContentWrapper title={dataModule.name} className="mt-14" actionBack={() => navigate('/home')}>
                <NewTable2 columns={columnsModules} data={dataModule.items} headerActions={headerActionsModule} onAction={handleAction} />
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
            {isToastVisible && <Toast text='Estado actualizado exitosamente' onClose={() => setIsToastVisible(!isToastVisible)} />}
            {isModalOpen &&
                <ModalAlert
                    handleCancel={() => setIsModalOpen(false)}
                    title='Cambio de estado'
                    message={`¿Estás seguro que deseas cambiar el estado a ${newStatus?.status}?`}
                    onClick={() => updateUserStatus(newStatus?.status, newStatus?.id)}
                    textSuccess='Aceptar'
                    textCancel='Cancelar'
                    variant='warning'
                />
            }
        </>
    )
}