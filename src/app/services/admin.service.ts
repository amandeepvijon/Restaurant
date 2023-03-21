import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { HttpHeaders,HttpClient } from '@angular/common/http';
import { env } from 'process';


@Injectable({
  providedIn: 'root'
})
export class AdminService {
  httpHeaders:any;
  httpOptions:any;

  constructor(private http: HttpClient) { }


 getlogo(): Observable<any>
  {
    return this.http.get(environment.apiBaseUrl + "/logo" + environment.restaurantId); 
  }

 addlogo(postData: any): Observable<any>
  {
    return this.http.post(environment.apiBaseUrl + "/logo/" + environment.restaurantId, postData);
  }

  deletelogo(): Observable<any>
  {
    return this.http.delete(environment.apiBaseUrl + "/logo/" + environment.restaurantId);
  }

  getbanner(): Observable<any>
  {
    return this.http.get(environment.apiBaseUrl + "/bannerData/" + environment.restaurantId); 
  }

  addBanner(postData: any): Observable<any>
  {
    return this.http.post(environment.apiBaseUrl + "/banner/" + environment.restaurantId, postData);
  }

  updateBanner(postData:any): Observable<any>
  {
    return this.http.put(environment.apiBaseUrl + "/banner/" + environment.restaurantId,postData);
  }

  deleteBanner(file: any): Observable<any>
  {
    let postData: any = {
      bannerLink: file
    }
    return this.http.delete(environment.apiBaseUrl + "/delete-banner/" + environment.restaurantId, {
      body: postData
    });
  }
  
  aboutSection(): Observable<any>
  {
    return this.http.get(environment.apiBaseUrl + "/about-usData/" + environment.restaurantId);
  }
  addaboutSection(postData: any): Observable<any>
  {
    return this.http.post(environment.apiBaseUrl + "/about-us/" + environment.restaurantId, postData);
  }
  updateaboutSection(postData:any): Observable<any>
  {
    return this.http.put(environment.apiBaseUrl + "/about-us/" + environment.restaurantId,postData);
  }
  gettestimonial(): Observable<any>
  {
    return this.http.get(environment.apiBaseUrl + "/getTestimonial/"  + environment.restaurantId); 
  }

  addtestimonial(postData: any): Observable<any>
  {
    return this.http.post(environment.apiBaseUrl + "/createTestimonial/"  + environment.restaurantId, postData);
  }
  
  updatestimonial(postData:any,id: any): Observable<any>
  {
    return this.http.put(environment.apiBaseUrl + "/updateTestimonial/"+id, postData);
  }
  deletetestimonial(id:any): Observable<any>
  {
    return this.http.delete(environment.apiBaseUrl + "/deleteTestimonial/"+id);
  }
  getgallery(): Observable<any>
  {
    return this.http.get(environment.apiBaseUrl + "/getImageData/" + environment.restaurantId); 
  }
  addgallery(postData: any): Observable<any>
  {
    return this.http.post(environment.apiBaseUrl + "/uploadImage/" + environment.restaurantId, postData);
  }
  updateGallery(postData:any): Observable<any>
  {
    return this.http.put(environment.apiBaseUrl + "/updateImage/" + environment.restaurantId,postData);
  }
  deleteGallery(id:any): Observable<any>
  {
    return this.http.delete(environment.apiBaseUrl + "/deleteImage/" + environment.restaurantId + "?filename="+id);
  }
  deleteaboutsection(): Observable<any>
  {
    return this.http.delete(environment.apiBaseUrl + "");
  }
  getMenu(): Observable<any>
  {
    return this.http.get(environment.apiBaseUrl + "/getMenuImageData/" + environment.restaurantId); 
  }
  addMenu(postData: any): Observable<any>
  {
    return this.http.post(environment.apiBaseUrl + "/PostMenuImage/" + environment.restaurantId, postData);
  }
   updateMenu(postData:any): Observable<any>
  {
    return this.http.put(environment.apiBaseUrl + "/updateMenuImage/" + environment.restaurantId,postData);
  }
  deleteMenu(id:any): Observable<any>
  {
    return this.http.delete(environment.apiBaseUrl + "/deleteMenuImage/"+ environment.restaurantId +"?imageLink="+id);
  }                                                   
  
  getFooter(): Observable<any>
  {
    return this.http.get(environment.apiBaseUrl + "/getFooterImage/" + environment.restaurantId); 
  }
  addfooterlogo(postData: any): Observable<any>
  {
    return this.http.post(environment.apiBaseUrl + "/postFooterImage/" + environment.restaurantId, postData);
  }
   updateFooter(postData:any): Observable<any>
  {
    return this.http.put(environment.apiBaseUrl + "/updateFooterImage/" + environment.restaurantId,postData);
  }
  deletefooterlogo(): Observable<any>
  {
    return this.http.delete(environment.apiBaseUrl + "/deleteFooterImage/" + environment.restaurantId);
  }
 
  
  getcontact(): Observable<any>
  {
    return this.http.get(environment.apiBaseUrl + "/getFooterDetails/" + environment.restaurantId); 
  }
   updatecontact(postData:any): Observable<any>
  {
    return this.http.put(environment.apiBaseUrl + "/updateFooterDetails/" + environment.restaurantId,postData);
  }
  getLocation(): Observable<any>
  {
    return this.http.get(environment.apiBaseUrl + "/getLocation/" + environment.restaurantId); 
  }
   updateLocation(postData:any): Observable<any>
  {
    return this.http.put(environment.apiBaseUrl + "/saveLocation/" + environment.restaurantId,postData);
  }
  gettimezone(): Observable<any>
  {
    return this.http.get(environment.apiBaseUrl + "/getFooterContent/" + environment.restaurantId); 
  }
   updatetimezone(postData:any): Observable<any>
  {
    return this.http.put(environment.apiBaseUrl + "/addFooterContent/" + environment.restaurantId,postData);
  }
  
  getImpressum(): Observable<any>
  {
    return this.http.get(environment.apiBaseUrl + "/getPrivacy/" + environment.restaurantId); 
  }
   updateImpressum(postData:any): Observable<any>
  {
    return this.http.put(environment.apiBaseUrl + "/updatePrivacy/" + environment.restaurantId,postData);
  }
  getDaten(): Observable<any>
  {
    return this.http.get(environment.apiBaseUrl + "/getImprint/" + environment.restaurantId); 
  }
   updateDaten(postData:any): Observable<any>
  {
    return this.http.put(environment.apiBaseUrl + "/updateImprint/" + environment.restaurantId,postData);
  }
  getUrl(): Observable<any>
  {
    return this.http.get(environment.apiBaseUrl + "/getUrl/" + environment.restaurantId); 
  }
   updateUrl(postData:any): Observable<any>
  {
    return this.http.put(environment.apiBaseUrl + "/updateUrl/" + environment.restaurantId,postData);
  }
  getSociallinks(): Observable<any>
  {
    return this.http.get(environment.apiBaseUrl + "/getLink/" + environment.restaurantId); 
  }
  updatSociallinks(postData:any): Observable<any>
  {
    return this.http.put(environment.apiBaseUrl + "/updateLink/" + environment.restaurantId,postData);
  }
  getReservation(): Observable<any>
  {
    return this.http.get(environment.apiBaseUrl + "/getRestuarentDetails/" + environment.restaurantId); 
  }
  updatReservation(postData:any): Observable<any>
  {
    return this.http.put(environment.apiBaseUrl + "/updateRestuarentDetails/" + environment.restaurantId,postData);
  }  getPricingImage(): Observable<any>
  {
    return this.http.get(environment.apiBaseUrl + "/getPricingImage/" + environment.restaurantId); 
  }
  postPricingImage(postData: any): Observable<any>
  {
    return this.http.post(environment.apiBaseUrl + "/postPricingImage/" + environment.restaurantId, postData);
  }
  updatePricingImage(postData:any): Observable<any>
  {
    return this.http.put(environment.apiBaseUrl + "/updatePricingImage/" + environment.restaurantId,postData);
  }
  deletePricingImage(): Observable<any>
  {
    return this.http.delete(environment.apiBaseUrl + "/deletePricingImage/" + environment.restaurantId);
  } 
  getItems(): Observable<any>
  {
    return this.http.get(environment.apiBaseUrl + "/getItemAndPrice/" + environment.restaurantId); 
  }
  postItems(postData: any): Observable<any>
  {
    return this.http.post(environment.apiBaseUrl + "/postItemAndPrice/" + environment.restaurantId, postData);
  }
  updateItem(postData:any,id:any): Observable<any>
  {
    return this.http.put(environment.apiBaseUrl + "/updateItemAndPrice/"+id,postData);
  }
  deleteItems(id:any): Observable<any>
  {
    return this.http.delete(environment.apiBaseUrl + "/deleteItemAndPrice/"+id);
  }
  getCategory(): Observable<any>
  {
    return this.http.get(environment.apiBaseUrl + "/getCategory/" + environment.restaurantId); 
  }
  updateCategory(postData:any): Observable<any>
  {
    return this.http.put(environment.apiBaseUrl + "/updateCategory/" + environment.restaurantId,postData);
  }
  getmenuCards(): Observable<any>
  {
    return this.http.get(environment.apiBaseUrl + ""); 
  }
  postmenuCards(postData: any): Observable<any>
  {
    return this.http.post(environment.apiBaseUrl + "", postData);
  }
  updatemenuCard(postData:any,id:any): Observable<any>
  {
    return this.http.put(environment.apiBaseUrl + "",postData);
  }
  deletemenuCard(id:any): Observable<any>
  {
    return this.http.delete(environment.apiBaseUrl + ""+id);
  }
   getPdf(): Observable<any>
  {
    return this.http.get(environment.apiBaseUrl + "/getPdf/" + environment.restaurantId); 
  } 
  addPdf(postData: any): Observable<any>
  {
    return this.http.post(environment.apiBaseUrl + "/uploadPdf/" + environment.restaurantId, postData);
  }
  updatePdf(postData:any): Observable<any>
  {
    return this.http.put(environment.apiBaseUrl + "/updatePdf/" + environment.restaurantId,postData);
  }
  deletePdf(id:any): Observable<any>
  {
    return this.http.delete(environment.apiBaseUrl + "/deletePdf/" +  environment.restaurantId +"?pdfLink="+id);
  }
  addCategoryMenu(postData: any): Observable<any>
  {
    return this.http.post(environment.apiBaseUrl + "/postCategory/" + environment.restaurantId, postData);
  }
  updateCategoryMenu(postData:any,id:any): Observable<any>
  {
    return this.http.put(environment.apiBaseUrl + "/updateMenuCategory/"+id,postData);
  }
  addMenuItemprice(postData:any,id: any): Observable<any>
  {
    return this.http.post(environment.apiBaseUrl + "/postMenuItemAndPrice/"+id, postData);
  }

  getCategoryMenu(): Observable<any>
  {
    return this.http.get(environment.apiBaseUrl + "/getMenuItemAndPrice/" + environment.restaurantId); 
  } 
  getmultipleCategory(): Observable<any>
  {
    return this.http.get(environment.apiBaseUrl + "/getMenuCategoryTitles/" + environment.restaurantId);
  }
  updateMenuItemAndPrice(postData:any,id:any): Observable<any>
  {
    return this.http.put(environment.apiBaseUrl + "/updateMenuItemAndPrice/"+id,postData);
  }
  
  getMenuItemAndPrice(): Observable<any>
  {
    return this.http.get(environment.apiBaseUrl + "/getMenuItemAndPrice/" + environment.restaurantId);
  }
  addToggle(postData:any): Observable<any>
  {
    return this.http.post(environment.apiBaseUrl + "/checkPdf/" + environment.restaurantId, postData);
  }
 
  getpdfcard(): Observable<any>
  {
    return this.http.get(environment.apiBaseUrl + "/restuarantDetails/" + environment.restaurantId);
  }
  updateRestEmail(postData:any): Observable<any>
  {
    return this.http.put(environment.apiBaseUrl + "/updateRestEmail/" + environment.restaurantId,postData);
  }
  deleteCategory(id:any): Observable<any>
  {
    return this.http.delete(environment.apiBaseUrl + "/deleteCategory/"+id);
  }
  deleteitemPrice(id:any): Observable<any>
  {
    return this.http.delete(environment.apiBaseUrl + "/deleteMenuItemAndPrice/"+id);
  }
  
  getTimezone(): Observable<any>{
    return this.http.get(environment.apiBaseUrl + "/getTiming/" + environment.restaurantId);
  }

  addTimezone(postData:any): Observable<any>
  {
    return this.http.post(environment.apiBaseUrl + "/postTiming/" + environment.restaurantId, postData);
  }

  updateTimezone(id: any,postData:any): Observable<any>
  {
    return this.http.put(environment.apiBaseUrl + "/updateTiming/"+id, postData);
  }
  deleteTimezone(id:any): Observable<any>
  {
    return this.http.delete(environment.apiBaseUrl + "/deleteTiming/"+id);
  }
  
} 

