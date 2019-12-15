const useLocal = false;

export const getRawUrl = (): string => {
  if (useLocal && window.location.hostname.indexOf('localhost') >= 0) {
    return 'http://localhost:8000';
  }
  return 'https://mpgagolf.pythonanywhere.com';
}

export const getBaseUrl = (): string => {
  if (useLocal && window.location.hostname.indexOf('localhost') >= 0) {
    return 'http://localhost:8000/api';
  }
  return 'https://mpgagolf.pythonanywhere.com/api';
}
  // get authUrl(): string {
  //   if (this.useLocal && window.location.hostname.indexOf('localhost') >= 0) {
  //     return 'http://localhost:8000/rest-auth';
  //   }
  //   return 'https://mpgagolf.pythonanywhere.com/rest-auth';
  // }
  // get adminUrl(): string {
  //   if (this.useLocal && window.location.hostname.indexOf('localhost') >= 0) {
  //     return 'http://localhost:8000/admin/';
  //   }
  //   return 'https://mpgagolf.pythonanywhere.com/admin/';
  // }
