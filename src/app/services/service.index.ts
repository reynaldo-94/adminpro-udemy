export { LoginGuardGuard } from './guards/login-guard.guard';
// Ya tengo todos los servicios, lo estoy usando en un archivo unico, cambio el import por el export, lo que quiero es tomar estos servicios y exportarlos, en caso de que al dia de mañana yo decida mover setting.service a otra carpeta, esta es la unica referecia directa al path de este archivo
export { SubirArchivoService } from './subir-archivo/subir-archivo.service';
export { UsuarioService  } from './usuario/usuario.service';
export { HospitalService } from './hospital/hospital.service';
export { MedicoService } from './medico/medico.service';
export { SettingsService  } from './settings/settings.service';
export { SharedService  } from './shared/shared.service';
export { SidebarService  } from './shared/sidebar.service';
