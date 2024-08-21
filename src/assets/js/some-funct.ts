export function makeToast(vue: any, variant: any, title: string, tostbody: any) {
    vue.$bvToast.toast(tostbody, {
        title: title,
        variant: variant,
        toaster: 'b-toaster-top-center',
        autoHideDelay: 5000,
        appendToast: true
    });
}

export async function getErrorText(response: Response) {
const contentType = response.headers.get('Content-Type');
    let errorMessage = 'Error creating document';
    if (contentType && contentType.includes('application/json')) {
        // Если ответ в формате JSON
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
    } else if (contentType && contentType.includes('text/plain')) {
        // Если ответ в формате текста
        errorMessage = await response.text();
    } else {
        // Для других форматов (если требуется)
        errorMessage = 'Unknown error format';
    }
    return errorMessage;
}