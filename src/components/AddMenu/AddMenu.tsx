import { Button,  InputTest } from "remoteUtilities/components-mf-utilities";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addMenusStore, addModulesStore, editMenuStore, editModulesStore, setSubmenusStore, setSystemStore } from "@/redux/slices";
import { DataInterface, ModuleTableStateInterface } from "@/interfaces";
import { postModules, updateModules } from "@/services/moduleService";

export const AddMenu: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const dataSubmenu = useAppSelector((state) => state.dataSubmenu);
  const formStateInit: ModuleTableStateInterface = {
    name: dataSubmenu.name? dataSubmenu.name : '',
    description: ''
  }
  const [formData, setFormData] = useState<ModuleTableStateInterface>(formStateInit);
  const dataMenu = useAppSelector((state) => state.dataMenu);
  const [errorValidation, setErrorValidation] = useState<{ name?: string }>({});
  const dataSystem = useAppSelector((state) => state.dataSystem);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const newItem: DataInterface = {
        name: formData.name,
        description: '',
        url: null,
        status: 'ACTIVE',
        idParent: dataMenu.id,
        items: [],
        level: 2,
        orderItem: 1,
        collapsible: true,
        profiles: []
      }
      const itemExists = dataMenu.items!.some(item => item.name.toLowerCase() === formData.name.toLowerCase());
      if (itemExists) {
        setErrorValidation({ name: 'Ya existe un módulo con este nombre' });
      }else{
        setErrorValidation({});
        dispatch(setSystemStore({ loading: true }));
        if(dataSystem.action === "update"){
          const data = await updateModules(dataSubmenu.id!, formData.name, '');
          dispatch(editMenuStore(data.name));
          dispatch(editModulesStore(data));
          dispatch(setSystemStore({ toast: true, toastMessage: 'Menu editado exitosamente' }));
          navigate(`/menu-management/menus`);
        }else{
          const data = await postModules(newItem);
          dispatch(addModulesStore(data));
          dispatch(addMenusStore(data));
          dispatch(setSubmenusStore({
            id: data.id,
            name: formData.name,
            level: data.level,
          }));
          dispatch(setSystemStore({ toast: true, toastMessage: 'Menu creado exitosamente' }));
          navigate(`/menu-management/submenus`);
        }
      }
    } catch (error: any) {
      console.error(error);
      dispatch(setSystemStore({ loading: false }));
    } finally {
      dispatch(setSystemStore({ loading: false }));
      dispatch(setSystemStore({ action: 'create' }));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="w-[752px] mx-auto">
        <div className="bg-white p-6 mt-14 rounded-btn">
          <h2 className="text-xl font-bold mb-6">{dataMenu.name}</h2>
          <InputTest label="Nombre del ménu" placeholder="Ingresa un nombre descriptivo" error={errorValidation.name} name="name" type="text" value={formData.name} onChange={handleChange} required />
        </div>
        <div className='w-full flex gap-4 justify-end mt-6'>
          <Button name="Volver" type="button" variant='secondary' onClick={() => navigate('/menu-management/menus')} />
          <Button name={dataSystem.action === "update" ? "Modificar" : "Crear y configurar"}  type="submit" />
        </div>
      </div>
    </form>
  )
}