import React from 'react';

function Compare() {
  return (
    <>
    <div className="bg-gray-100 p-4">
      <h1 className="text-center text-xl font-bold mb-6">So Sánh iPhone 16 128GB và iPhone 16 Pro 128GB</h1>

      {/* Products Section */}
      <div className="grid grid-cols-2 gap-4">
        {/* iPhone 16 */}
        <div className="bg-white shadow p-4 rounded">
          <img src="https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-16-1.png" alt="iPhone 16" className="w-full h-40 object-cover mb-4" />
          <h2 className="text-lg font-bold">iPhone 16 128GB | Chính hãng VN/A</h2>
          <p className="text-red-500 text-lg font-bold">22.090.000đ <span className="line-through text-gray-500">22.990.000đ</span></p>
          <p className="text-gray-500">Giá lên đời: 21.090.000đ</p>
          <button className="mt-4 bg-red-500 text-white py-2 px-4 rounded w-full">Mua ngay</button>
        </div>

        {/* iPhone 16 Pro */}
        <div className="bg-white shadow p-4 rounded">
          <img src="https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-16-1.png" alt="iPhone 16 Pro" className="w-full h-40 object-cover mb-4" />
          <h2 className="text-lg font-bold">iPhone 16 Pro 128GB | Chính hãng VN/A</h2>
          <p className="text-red-500 text-lg font-bold">28.390.000đ <span className="line-through text-gray-500">28.990.000đ</span></p>
          <p className="text-gray-500">Giá lên đời: 27.390.000đ</p>
          <button className="mt-4 bg-red-500 text-white py-2 px-4 rounded w-full">Mua ngay</button>
        </div>
      </div>

      {/* Basic Information Section */}
      <div className="mt-6 bg-white shadow rounded p-4">
        <h3 className="text-lg font-bold mb-4">Thông tin cơ bản</h3>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="border-b py-2">Thông tin</th>
              <th className="border-b py-2">iPhone 16</th>
              <th className="border-b py-2">iPhone 16 Pro</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border-b py-2">Kích thước màn hình</td>
              <td className="border-b py-2">6.1 inches</td>
              <td className="border-b py-2">6.3 inches</td>
            </tr>
            <tr>
              <td className="border-b py-2">Công nghệ màn hình</td>
              <td className="border-b py-2">Super Retina XDR OLED</td>
              <td className="border-b py-2">Super Retina XDR OLED</td>
            </tr>
            <tr>
              <td className="border-b py-2">Camera sau</td>
              <td className="border-b py-2">48MP, 12MP góc siêu rộng</td>
              <td className="border-b py-2">48MP, 12MP tele, 48MP góc siêu rộng</td>
            </tr>
            <tr>
              <td className="border-b py-2">Camera trước</td>
              <td className="border-b py-2">12MP</td>
              <td className="border-b py-2">12MP</td>
            </tr>
            <tr>
              <td className="border-b py-2">Chipset</td>
              <td className="border-b py-2">Apple A18</td>
              <td className="border-b py-2">Apple A18 Pro</td>
            </tr>
            <tr>
              <td className="border-b py-2">Bộ nhớ trong</td>
              <td className="border-b py-2">128GB</td>
              <td className="border-b py-2">128GB</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Screen Features Section */}
      <div className="mt-6 bg-white shadow rounded p-4">
        <h3 className="text-lg font-bold mb-4">Tính năng màn hình</h3>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="border-b py-2">Tính năng</th>
              <th className="border-b py-2">iPhone 16</th>
              <th className="border-b py-2">iPhone 16 Pro</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border-b py-2">Dynamic Island</td>
              <td className="border-b py-2">Có</td>
              <td className="border-b py-2">Có</td>
            </tr>
            <tr>
              <td className="border-b py-2">Độ sáng tối đa</td>
              <td className="border-b py-2">1000 nits</td>
              <td className="border-b py-2">1000 nits</td>
            </tr>
            <tr>
              <td className="border-b py-2">Độ phân giải</td>
              <td className="border-b py-2">2556 x 1179 pixels</td>
              <td className="border-b py-2">2556 x 1179 pixels</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
};

export default Compare;
