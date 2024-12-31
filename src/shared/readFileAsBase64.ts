export const readFileAsBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) =>
      resolve(e.target?.result?.toString().split(',')[1] ?? '');
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};
