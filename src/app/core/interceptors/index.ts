import { AuthHeaderInterceptor } from '@app/core/interceptors/auth-header.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

export const INTERCEPTOR_PROVIDERS = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthHeaderInterceptor,
    multi: true,
  },
];
