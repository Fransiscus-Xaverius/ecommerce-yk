export const transformProductData = (backendProduct) => {
  if (!backendProduct) return null;
  const gambar = Array.isArray(backendProduct.gambar) ? backendProduct.gambar.map(g => g) : [];
  return {
    id: backendProduct.no || backendProduct.artikel,
    artikel: backendProduct.artikel,
    nama: backendProduct.nama,
    harga_diskon: parseFloat(backendProduct.harga_diskon) || 0,
    originalPrice: parseFloat(backendProduct.harga) || 0,
    rating: backendProduct.rating && typeof backendProduct.rating === 'object' ? {
      comfort: parseInt(backendProduct.rating.comfort) || 0,
      style: parseInt(backendProduct.rating.style) || 0,
      support: parseInt(backendProduct.rating.support) || 0,
      purpose: Array.isArray(backendProduct.rating.purpose) ? backendProduct.rating.purpose.filter(p => p && p.trim() !== '') : []
    } : { comfort: 0, style: 0, support: 0, purpose: [] },
    gambar,
    colors: backendProduct.colors || [],
    size: backendProduct.size || '',
    grup: backendProduct.grup || '',
    kat: backendProduct.kat || '',
    gender: backendProduct.gender || '',
    tipe: backendProduct.tipe || '',
    unit: backendProduct.unit || '',
    model: backendProduct.model || '',
    status: backendProduct.status || '',
    supplier: backendProduct.supplier || '',
    usia: backendProduct.usia || '',
    tanggal_produk: backendProduct.tanggal_produk,
    tanggal_terima: backendProduct.tanggal_terima,
    tanggal_update: backendProduct.tanggal_update,
    description: backendProduct.deskripsi || `Premium ${backendProduct.nama} dengan kualitas terbaik dari ${backendProduct.supplier || 'supplier terpercaya'}.`,
    isSale: false,
    marketplace: backendProduct.marketplace || {},
    offline: backendProduct.offline || []
  };
};

export default transformProductData;
