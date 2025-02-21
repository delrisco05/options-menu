import { DataInterface } from '@/interfaces';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { addModulesStore, addSubmenusStore, setSystemStore } from '@/redux/slices';
import { postModules } from '@/services/moduleService';
import React, { useState, useEffect } from 'react';
import { Button, InputTest } from "remoteUtilities/components-mf-utilities";

export const ModalContent: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'submenu' | 'action'>('submenu');
  const [formData, setFormData] = useState({ submenu: '', action: '', url: '' });
  const [isFormValid, setIsFormValid] = useState(false);
  const [errorValidation, setErrorValidation] = useState<{ name?: string }>({});
  const dataSubmenu = useAppSelector((state) => state.dataSubmenu);
  const dataExtraItem = useAppSelector((state) => state.dataExtraItem);
  const dataSystem = useAppSelector((state) => state.dataSystem);
  const dispatch = useAppDispatch();

  const handleButtonClick = (section: 'submenu' | 'action', event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setActiveSection(section);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  useEffect(() => {
    if (activeSection === 'submenu') {
      setIsFormValid(formData.submenu.trim() !== '');
    } else if (activeSection === 'action') {
      setIsFormValid(formData.action.trim() !== '' && formData.url.trim() !== '');
    }
  }, [formData, activeSection]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    let name = '';
    let collapsible = false;
    let idParent = 0;
    try {
      switch (dataSystem.modalType) {
        case 'extraitem':
          idParent = dataExtraItem.id!;
          break;
  
        default:
          idParent = dataSubmenu.id!;
          break;
      }
  
      if (activeSection === 'submenu') {
        name = formData.submenu;
        collapsible = true;
      } else if (activeSection === 'action') {
        name = formData.action;
      }
      
      const newItem: DataInterface = {
        name,
        description: '',
        url: formData.url,
        status: 'ACTIVE',
        idParent,
        items: [],
        level: 3,
        orderItem: 1,
        collapsible,
        profiles: []
      }

      const itemExists = dataSubmenu.items!.some(item => item.name.toLowerCase() === name.toLowerCase());

      if (itemExists) {
        setErrorValidation({ name: 'Ya existe un submenú con este nombre' });
      }else{
        setErrorValidation({});
        dispatch(setSystemStore({ loading: true }));
        const data = await postModules(newItem);
        dispatch(addModulesStore(data));
        dispatch(addSubmenusStore(data));
        dispatch(setSystemStore({ toast: true, toastMessage: 'Submenu creado exitosamente' }));
        dispatch(setSystemStore({ modal: false, modalType: '' }));
      }
    } catch (error: any) {
      console.error(error);
      dispatch(setSystemStore({ loading: false }));
    } finally {
      dispatch(setSystemStore({ loading: false }));
    }
  };

  return (
    <>
      <form noValidate onSubmit={handleSubmit}>
        <label className="block font-bold leading-4 text-[#3D3D3D] text-opacity-80 px-4 text-base mb-2">
          Tipo de funcionalidad <span className="text-red-500">*</span>
        </label>
        <div className="p-px mb-6 flex w-full justify-between rounded-btn border border-[#CCCCCC]">
          <Button name="Subménu" className="w-1/2" variant={activeSection === "submenu" ? 'primary' : 'secondary'} onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleButtonClick('submenu', event)}>Subménu</Button>
          <Button name="Acción" className="w-1/2" variant={activeSection === "action" ? 'primary' : 'secondary'} onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleButtonClick('action', event)}>Acción</Button>
        </div>
        {activeSection === 'submenu' && (
          <div id="submenu">
            <InputTest label="Nombre del sub menú" placeholder="Ingresa el nombre del sub menú" error={errorValidation.name} name="submenu" type="text" onChange={handleInputChange} required />
          </div>
        )}
        {activeSection === 'action' && (
          <div id="action">
            <InputTest label="Nombre de la acción" placeholder="Ingresa el nombre de la acción" error={errorValidation.name} name="action" type="text" onChange={handleInputChange} required />
            <InputTest label="Url" placeholder="Ingresa el url de la acción" name="url" type="text" onChange={handleInputChange} required />
          </div>
        )}
        <div className="flex justify-end space-x-2">
          <Button name="Cancelar" type="button" variant='secondary' onClick={() => dispatch(setSystemStore({ modal: false, modalType: '' }))} />
          <Button name="Crear" type="submit" disabled={!isFormValid} />
        </div>
      </form>
    </>
  );
};
