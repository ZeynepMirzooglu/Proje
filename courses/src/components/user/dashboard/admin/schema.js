import * as yup from 'yup'


const CourseSchema={
    category:yup.string().required('Kategori Zorunludur!'),
    title:yup.string().required('Başlık Zorunludur!'),
    summary:yup.string().required('Kurs özeti girmek Zorunludur!').min(10,'Minimum 10 karakter giriniz!'),
    rating:yup.string().required('Kurs Puanı Zorunludur!'),
    img:yup.string().required('Kurs Resmi girmek Zorunludur!').url('Lütfen geçerli bir url giriniz!'),
}

export default CourseSchema;