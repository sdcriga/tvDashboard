import { Component } from '@angular/core';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrl: './images.component.scss'
})
export class ImagesComponent {

  newsImages = [
    'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fG9mZmljZXxlbnwwfHwwfHx8MA%3D%3D',
    'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDh8fG9mZmljZXxlbnwwfHwwfHx8MA%3D%3D',
    'https://images.unsplash.com/photo-1496681859237-6039cd585c4e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzF8fG9mZmljZXxlbnwwfHwwfHx8MA%3D%3D',
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjN8fG9mZmljZXxlbnwwfHwwfHx8MA%3D%3D',
    'https://images.unsplash.com/photo-1489981424607-45c58daf0581?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTMyfHxncmVlbnxlbnwwfHwwfHx8MA%3D%3D',
    'https://images.unsplash.com/photo-1533460004989-cef01064af7e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjU2fHxncmVlbnxlbnwwfHwwfHx8MA%3D%3D',
    'https://images.unsplash.com/photo-1471696035578-3d8c78d99684?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTF8fGZsb3dlcnN8ZW58MHx8MHx8fDA%3D',
    'https://images.unsplash.com/photo-1504386106331-3e4e71712b38?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHN1bnxlbnwwfHwwfHx8MA%3D%3D',
    'https://images.unsplash.com/photo-1537210249814-b9a10a161ae4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTZ8fHNreXxlbnwwfHwwfHx8MA%3D%3D',
    'https://images.unsplash.com/photo-1516894616099-6c730b9db8a9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDN8fHBhdHRlcm5zfGVufDB8fDB8fHww',
    'https://images.unsplash.com/photo-1648693956698-ad30bf033b35?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTA1fHxwYXR0ZXJuc3xlbnwwfHwwfHx8MA%3D%3D',
    'https://images.unsplash.com/photo-1648907736562-b1cb3dd632dd?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDE4fHxwYXR0ZXJuc3xlbnwwfHwwfHx8MA%3D%3D',
    'https://images.unsplash.com/photo-1517867065801-e20f409696b0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGVhcnRzfGVufDB8fDB8fHww',
    'https://images.unsplash.com/photo-1516822477961-1427b7790e80?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aGVhcnRzfGVufDB8fDB8fHww',
    'https://plus.unsplash.com/premium_photo-1682310144714-cb77b1e6d64a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODF8fHN1Y2Nlc3N8ZW58MHx8MHx8fDA%3D',
    'https://images.unsplash.com/photo-1526566661780-1a67ea3c863e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHB1enpsZXxlbnwwfHwwfHx8MA%3D%3D',
    'https://images.unsplash.com/photo-1455849318743-b2233052fcff?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODJ8fHdvcmt8ZW58MHx8MHx8fDA%3D',
    'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fG9mZmljZSUyMHBhcnR5fGVufDB8fDB8fHww',
    'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fG9mZmljZSUyMHBhcnR5fGVufDB8fDB8fHww',
    'https://images.unsplash.com/photo-1512758017271-d7b84c2113f1?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODZ8fG9mZmljZSUyMHBhcnR5fGVufDB8fDB8fHww'

  ];

  eventImages = [
    'https://images.unsplash.com/photo-1632501641765-e568d28b0015?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzF8fGJvYXJkJTIwZ2FtZXxlbnwwfHwwfHx8MA%3D%3D',
    'https://images.unsplash.com/photo-1633365087123-b3f2c305769a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODB8fGJvYXJkJTIwZ2FtZXxlbnwwfHwwfHx8MA%3D%3D',
    'https://images.unsplash.com/photo-1576250263863-11f6bfa98823?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTUyfHxib2FyZCUyMGdhbWV8ZW58MHx8MHx8fDA%3D',
    'https://images.unsplash.com/photo-1642056446459-1f10774273f2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTkwfHxib2FyZCUyMGdhbWV8ZW58MHx8MHx8fDA%3D',
    'https://images.unsplash.com/photo-1653080583467-cf46333f692e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjEwfHxib2FyZCUyMGdhbWV8ZW58MHx8MHx8fDA%3D',
    'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fG9mZmljZSUyMHBhcnR5fGVufDB8fDB8fHww',
    'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fG9mZmljZSUyMHBhcnR5fGVufDB8fDB8fHww',
    'https://images.unsplash.com/photo-1478145787956-f6f12c59624d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDZ8fG9mZmljZSUyMHBhcnR5fGVufDB8fDB8fHww',
    'https://images.unsplash.com/photo-1519214605650-76a613ee3245?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTV8fG9mZmljZSUyMHBhcnR5fGVufDB8fDB8fHww',
    'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTV8fG9mZmljZSUyMHBhcnR5fGVufDB8fDB8fHww',
    'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHBhcnR5fGVufDB8fDB8fHww',
    'https://images.unsplash.com/photo-1600628421060-939639517883?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjN8fHBpenphfGVufDB8fDB8fHww',
    'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTc2fHxicnVuY2h8ZW58MHx8MHx8fDA%3D',
    'https://images.unsplash.com/photo-1607962837359-5e7e89f86776?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fHJ1bm5pbmd8ZW58MHx8MHx8fDA%3D',
    'https://images.unsplash.com/photo-1549576490-b0b4831ef60a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTh8fGV4ZXJjaXNlfGVufDB8fDB8fHww',
    'https://images.unsplash.com/photo-1486428128344-5413e434ad35?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y2FrZXxlbnwwfHwwfHx8MA%3D%3D',
    'https://plus.unsplash.com/premium_photo-1681826507324-0b3c43928753?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTE3fHxjYWtlfGVufDB8fDB8fHww',
    




  ]

}
