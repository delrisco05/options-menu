import { Button,  InputTest } from "remoteUtilities/components-mf-utilities";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { ModuleTableStateInterface } from "@/interfaces";
import { editModulesStore, setSystemStore } from "@/redux/slices";
import { updateModules } from "@/services/moduleService";

export const EditSubmenu: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const formStateInit: ModuleTableStateInterface = {
      name: '',
      url: ''
    }

    const [formData, setFormData] = useState<ModuleTableStateInterface>(formStateInit); 
    const dataExtraItem = useAppSelector((state)=> state.dataExtraItem);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(setSystemStore({loading: true}));
        try {
            let name = (formData.name && dataExtraItem.name !== formData.name) ? formData.name : dataExtraItem.name;
            let url = (formData.url && formData.url !== dataExtraItem.url) ? formData.url : dataExtraItem.url || '';
            await updateModules(dataExtraItem.id!, name, url);
            dispatch(editModulesStore({id: dataExtraItem.id!, name, url}));
            dispatch(setSystemStore({loading: false}));
            dispatch(setSystemStore({toast: true, toastMessage: 'Submenu editado exitosamente'}));
        } catch (error: any) {
          console.error(error);
          dispatch(setSystemStore({loading: false}));
        } finally {
          dispatch(setSystemStore({loading: false}));
          navigate(`/menu-management/submenus`);
        }
      };

    return (
        <form onSubmit={handleSubmit}>
            <div className="w-[752px] mx-auto">
                <div className="bg-white p-6 mt-14 rounded-btn">
                    <h2 className="text-xl font-bold mb-6">{dataExtraItem.name}</h2>    
                    <InputTest value={dataExtraItem.name} label="Nombre del ménu" placeholder="Ingresa un nombre descriptivo" name="name" type="text" onChange={handleChange} required/>
                    {dataExtraItem.url && (<InputTest value={dataExtraItem.url} label="Url" placeholder="Ingresa el url de la acción" name="url" type="text" onChange={handleChange} required/>)}
                </div>
                <div className='w-full flex gap-4 justify-end mt-6'>
                    <Button name="Volver" type="button" variant='secondary' onClick={() => navigate('/menu-management/submenus')}/>
                    <Button name="Editar" type="submit" />
                </div>
            </div>
        </form>
    )
  }