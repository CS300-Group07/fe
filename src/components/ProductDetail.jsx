import React from 'react';

function ProductDetail() {
  return (
    <div className="bg-gray-100 p-4">
      {/* Header Section */}
      <div className="bg-white shadow-md p-4 rounded mb-6">
        <h1 className="text-xl font-bold">Điện thoại OPPO Find X8 Pro 5G 16GB/512GB</h1>
        <p className="text-yellow-500 font-bold">Chỉ có tại <span className="text-black">thegioididong</span></p>
      </div>

      {/* Product Details Section */}
      <div className="grid grid-cols-2 gap-6">
        {/* Image Section */}
        <div className="bg-white shadow p-4 rounded">
          <img
            src="/path-to-oppo-find-x8-image"
            alt="OPPO Find X8 Pro"
            className="w-full h-96 object-cover rounded mb-4"
          />
        </div>

        {/* Pricing Section */}
        <div className="bg-white shadow p-4 rounded">
          <h2 className="text-red-500 text-2xl font-bold mb-2">29.990.000đ</h2>
          <p className="text-orange-500 font-semibold">HÀNG SẮP VỀ</p>

          {/* Registration Form */}
          <div className="bg-gray-100 p-4 mt-4 rounded">
            <h3 className="text-lg font-bold mb-2">Đăng ký nhận thông tin khi hàng về</h3>
            <form className="space-y-2">
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input type="radio" name="gender" value="Anh" className="mr-2" /> Anh
                </label>
                <label className="flex items-center">
                  <input type="radio" name="gender" value="Chị" className="mr-2" /> Chị
                </label>
              </div>
              <input
                type="text"
                placeholder="Họ tên"
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                placeholder="Số điện thoại"
                className="w-full border p-2 rounded"
              />
              <input
                type="email"
                placeholder="Email (không bắt buộc)"
                className="w-full border p-2 rounded"
              />
              <button className="bg-orange-500 text-white py-2 px-4 rounded w-full">
                Đăng ký
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Specifications Section */}
      <div className="bg-white shadow p-4 rounded mt-6">
        <h3 className="text-lg font-bold mb-4">Thông số kỹ thuật</h3>
        <ul className="list-disc pl-4 space-y-2">
          <li>Hệ điều hành: Android 15</li>
          <li>Chip xử lý (CPU): MediaTek Dimensity 9400</li>
          <li>Tốc độ CPU: 1 nhân 3.6GHz, 3 nhân 3.3GHz, 4 nhân 2.4GHz</li>
          <li>Chip đồ họa (GPU): ARM Immortalis G925 MC12</li>
          <li>RAM: 16GB</li>
          <li>Dung lượng lưu trữ: 512GB</li>
          <li>Dung lượng còn lại (khả dụng): 475GB</li>
        </ul>
      </div>

      {/* Footer Section */}
      <div className="bg-gray-200 mt-6 p-4 rounded">
        <h3 className="text-lg font-bold mb-4">Đánh giá sản phẩm này</h3>
        <div className="flex space-x-4">
          {['Rất tệ', 'Tệ', 'Tạm ổn', 'Tốt', 'Rất tốt'].map((rating) => (
            <button
              key={rating}
              className="bg-yellow-300 py-2 px-4 rounded text-sm font-bold"
            >
              {rating}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

