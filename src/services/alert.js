let showAlertFn = null

export function registerAlert(fn) {
  showAlertFn = fn
}

export function showAlert(message, type = 'success') {
  if (showAlertFn) {
    showAlertFn(message, type)
  } else {
    console.warn('Alert não foi registrado.')
  }
}
