import { DataInterface, ModuleTableStateInterface } from '@/interfaces';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { addModulesStore, editModulesStore, setSystemStore } from '@/redux/slices';
import { postModules, updateModules } from '@/services/moduleService';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, InputTest } from 'remoteUtilities/components-mf-utilities';

const AddModule: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const dataMenu = useAppSelector((state) => state.dataMenu);
  const formStateInit: ModuleTableStateInterface = {
    name: dataMenu.name? dataMenu.name : '',
    description: dataMenu.description? dataMenu.description : ''
  }
  const [formData, setFormData] = useState<ModuleTableStateInterface>(formStateInit);
  const [errorValidation, setErrorValidation] = useState<{ name?: string }>({});
  const dataModule = useAppSelector((state) => state.dataModule);
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
        description: formData.description,
        url: null,
        status: 'ACTIVE',
        idParent: null,
        items: [],
        level: 1,
        orderItem: 1,
        collapsible: true,
        profiles: []
      }
      const itemExists = dataModule.items!.some(item => item.name.toLowerCase() === newItem.name.toLowerCase());

      if (itemExists) {
        setErrorValidation({ name: 'Ya existe un módulo con este nombre' });
      } else {
        setErrorValidation({});
        dispatch(setSystemStore({ loading: true }));
        if(dataSystem.action === "update"){
          const data = await updateModules(dataMenu.id!, formData.name, '', formData.description,
          );
        dispatch(editModulesStore(data));
        dispatch(setSystemStore({ toast: true, toastMessage: 'Modulo editado exitosamente' }));
        }else{
          const data = await postModules(newItem);
          dispatch(addModulesStore(data));
          dispatch(setSystemStore({ toast: true, toastMessage: 'Modulo creado exitosamente' }));
        }  
        navigate(-1);
      }
    } catch (error: any) {
      console.error(error);
      dispatch(setSystemStore({ loading: false }));
    } finally {
      dispatch(setSystemStore({ action: 'create' }));
      dispatch(setSystemStore({ loading: false }));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="w-[752px] mx-auto">
        <div className="bg-white p-6 mt-14 rounded-btn">
          <h2 className="text-xl font-bold mb-6">{dataModule.name}</h2>
          <InputTest
            type="text"
            name="name"
            label="Nombre del módulo"
            placeholder="Ingresa un nombre descriptivo"
            value={formData.name}
            onChange={handleChange}
            error={errorValidation.name}
            required
          />
          <InputTest
            type="text"
            name="description"
            label="Descripción del módulo"
            placeholder="Ingresa una breve descripción de la funcionalidad del módulo"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className='w-full flex gap-4 justify-end mt-6'>
          <Button name="Volver" type="button" variant='secondary' onClick={() => navigate(-1)} />
          <Button name={dataSystem.action != "update" ? "Crear" : "Editar"} type="submit" />
        </div>
      </div>
    </form>
  );
};

export default AddModule;
