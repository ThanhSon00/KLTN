
# Trang web chia sẻ kiến thức

Đối tượng sử dụng là những người có kiến thức công nghệ thông tin cơ bản gặp vấn đề trong các nhu cầu hàng ngày như là soạn thảo văn bản, viết email, tìm kiếm thông tin, dùng mạng xã hội, giải trí, xem phim, ...

## Thông tin thêm

- [Video demo](https://youtu.be/ennOf3-ltfA)
- [Báo cáo](https://gitlab.com/kltl-ute/242k/22/-/tree/main/BC_KL_Nhom_22.pdf)
- [Dữ liệu](https://gitlab.com/kltl-ute/242k/22/-/tree/main/data/)

## Thành viên

- [Phan Hoàng Thanh Sơn - 20110714](https://www.github.com/thanhson00)


## Yêu cầu hệ thống

- [Node v20.11+](https://nodejs.org/en/download/current/)
- [Yarn](https://yarnpkg.com/en/docs/install)
- [Python v3.11.x](https://www.python.org/downloads/)
- [MongoDB Community v7.0.6+](https://www.mongodb.com/try/download/community)


## Cài đặt chương trình

Đầu tiên bạn tải source code và cài đặt các thư viện liên quan bằng lệnh:

```bash
  git clone https://gitlab.com/kltl-ute/242k/22
```
Vào thư mục gốc 
```bash
  cd 22
```

Tải các thư viện cần thiết
```bash
  yarn install
```

## Thiết lập biến môi trường

Để chạy chương trình này, bạn sẽ cần thêm biến sau vào trong tập tin `.env.development` trong thư muc `server` tại thư mục gốc

`MONGODB_URL` 

Ví dụ 

`MONGODB_URL=mongodb://127.0.0.1:27017/db-name`


## Chạy chương trình

Để chạy chương trình trên máy, bạn dùng lệnh

```bash
  yarn dev
```


## Cài đặt và chạy server 2

Sau khi chạy chương trình, ta cần phải chạy thêm server 2, đầu tiên bạn chuyển vào thư mục `nlp`

```bash
  cd nlp
```

Sau đó tạo môi trường ảo

```bash
  python3.11 -m venv .venv
```

Tiếp theo là cài đặt thư viện cần thiết

```bash
  pip install -r requirements.txt
```

Cuối cùng là chạy server

```bash
  cd todo
  python manage.py runserver
```

## Cơ sở dữ liệu - Cài đặt dữ liệu giả

Sau khi chạy chương trình, ta có thể bổ sung dữ liệu giả nếu cần thiết. Ta sử dụng [MongoDB Compass v1.42.1+](https://www.mongodb.com/try/download/compass) đăng nhập mongodb server, tìm kiếm cơ sở dữ liệu ta đã tạo trước khi chạy chương trình. 

Trong đó, đã có sẵn các collection, ta thêm dữ liệu giả vào đó bằng các tập tin json cùng tên tương ứng trong đường dẫn [/22/data/](https://gitlab.com/kltl-ute/242k/22/-/tree/main/data/).

![Đưa dữ liệu vào MongoDB bằng Compass](https://res.cloudinary.com/dfnm6sooi/image/upload/v1720539653/nryynqhndzrpckmolgvm.png)



