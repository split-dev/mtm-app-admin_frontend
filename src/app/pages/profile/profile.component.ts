import { Component} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomersService } from 'src/app/services/customers.service';
import { FilesService } from 'src/app/services/files.service';
import { MetafieldsService } from 'src/app/services/metafields.service';
import { Customer, CustomerMetafields } from '../interfaces/customers.interface';
import { suitType } from '../interfaces/products.interface';
import { debounceTime } from 'rxjs/operators';
import { throwError, Observable, Subject, of, timer } from 'rxjs';
import { catchError, takeWhile, delay, retry, concatMap } from 'rxjs/operators';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  private debounceSubject = new Subject<string>();
  private debounceText = new Subject<string>();
  currentPageCustomerList: number = 1;
  profile_completed: boolean | undefined
  customerId: string | null = '';
  customer: Customer | undefined = undefined;
  IMG_WAIT_DELAY: number = 1000;

  valueBodyMeasurements:any = {
    "chest": '0',
    "stomach": '0',
    "back_length": '0',
    "front_waist_length": '0',
    "nape_to_waist": '0',
    "bicep": '0',
    "shoulder": '0',
    "sleeve": '0',
    "font_shoulder": '0',
    "wrist_circumference":'0',
    "pant_bottom":'0',
    "calf_girth":'0',
    "u_rise": '0',
    "neck": '0',
    "waist": '0',
    "seat": '0',
    "outleg": '0',
    "inleg": '0',
    "thigh": '0',
    "knee": '0',
    "front_waist_height": '0',
    "back_waist_height": '0',
    "posture":{
      "slope_shoulder_left":'0',
      "slope_shoulder_right":'0',
      "shoulder_blade":'0',
      "back_style":'0',
      "chest":'0',
      "stomach":'0',
      "arm":'0',
      "soulders":'0',
    }
  }
  valueFinalGarmentObj:any = {
    pant:{
      waist: '0',
      thigh: '0',
      u_rise: '0',
      front_waist_height: '0',
      back_waist_height: '0',
      outseam_l:'0',
      outseam_r:'0',
      knee: '0',
      pant_bottom: '0',
      calf_girth: '0',
      adjustments:{
        seat:'0',
        waist_height:'0',
        front_rise:'0',
        zipper_length:'0',
        front_thigh:'0',
        notes:'0'
      }
    },
    jacket:{
      neck: '0',
      chest: '0',
      stomach: '0',
      front_waist_length: '0',
      sleeve_l:'0',
      sleeve_r:'0',
      seat: '0',
      bicep: '0',
      shoulder: '0',
      front_shoulder: '0',
      nape_to_waist : '0',
      back_length: '0',
      adjustments:{
        half_back_to_stomach:'0',
        half_back_to_bottom:'0',
        shoulder_pad:'0',
        back_pad:'0',
        armhole:'0',
        lower_back_collar:'0',
        nape_to_waist:'0',
        notes:'0'
      }
    },
    overcoat:{
      neck: '0',
      chest: '0',
      stomach: '0',
      front_waist_length: '0',
      sleeve_l:'0',
      sleeve_r:'0',
      seat: '0',
      bicep: '0',
      shoulder: '0',
      front_shoulder: '0',
      nape_to_waist : '0',
      back_length: '0',
      adjustments:{
        half_back_to_stomach:'0',
        half_back_to_bottom:'0',
        shoulder_pad:'0',
        back_pad:'0',
        armhole:'0',
        lower_back_collar:'0',
        nape_to_waist:'0',
        notes:'0'
      }
    },
    shirt:{
      neck: '0',
      chest: '0',
      stomach: '0',
      front_waist_length: '0',
      sleeve_l:'0',
      sleeve_r:'0',
      seat: '0',
      bicep: '0',
      shoulder: '0',
      front_shoulder: '0',
      nape_to_waist : '0',
      back_length: '0',
      adjustments:{
        half_back_to_stomach:'0',
        half_back_to_bottom:'0',
        armhole:'0',
        lower_back_collar:'0',
        nape_to_waist:'0',
        notes:'0'
      }
    },
    vest:{
      vest_back_length: '0',
      neck: '0',
      chest: '0',
      stomach: '0',
      shoulder: '0',
      front_shoulder: '0',
      nape_to_waist : '0',
      front_waist_length: '0',
      front_waist_height: '0',
      back_waist_height: '0',
      adjustments:{
        half_back_to_stomach:'0',
        half_back_to_bottom:'0',
        armhole:'0',
        lower_back_collar:'0',
        nape_to_waist:'0',
        notes:'0'
      }
    },
  };
  valueFinalGarmentFemaleOrOtherObj:any = {
    pant:{
      waist: '0',
      thigh: '0',
      u_rise: '0',
      front_waist_height: '0',
      back_waist_height: '0',
      outseam_l:'0',
      outseam_r:'0',
      knee: '0',
      pant_bottom: '0',
      calf_girth: '0',
      adjustments:{
        seat:'0',
        waist_height:'0',
        front_rise:'0',
        zipper_length:'0',
        front_thigh:'0',
        notes:'0'
      }
    },
    jacket:{
      neck: '0',
      chest: '0',
      stomach: '0',
      front_waist_length: '0',
      sleeve_l:'0',
      sleeve_r:'0',
      seat: '0',
      bicep: '0',
      shoulder: '0',
      front_shoulder: '0',
      nape_to_waist : '0',
      back_length: '0',
      breast_highest_point:'0',
      adjustments:{
        half_back_to_stomach:'0',
        half_back_to_bottom:'0',
        shoulder_pad:'0',
        back_pad:'0',
        armhole:'0',
        lower_back_collar:'0',
        nape_to_waist:'0',
        notes:'0'
      }
    },
    overcoat:{
      neck: '0',
      chest: '0',
      stomach: '0',
      front_waist_length: '0',
      sleeve_l:'0',
      sleeve_r:'0',
      seat: '0',
      bicep: '0',
      shoulder: '0',
      front_shoulder: '0',
      nape_to_waist : '0',
      back_length: '0',
      overcoat_length:'0',
      adjustments:{
        half_back_to_stomach:'0',
        half_back_to_bottom:'0',
        shoulder_pad:'0',
        back_pad:'0',
        armhole:'0',
        lower_back_collar:'0',
        nape_to_waist:'0',
        notes:'0'
      }
    },
    shirt:{
      neck: '0',
      chest: '0',
      stomach: '0',
      front_waist_length: '0',
      sleeve_l:'0',
      sleeve_r:'0',
      seat: '0',
      bicep: '0',
      shoulder: '0',
      front_shoulder: '0',
      nape_to_waist : '0',
      back_length: '0',
      wrist_l:'0',
      wrist_r:'0',
      adjustments:{
        half_back_to_stomach:'0',
        half_back_to_bottom:'0',
        armhole:'0',
        lower_back_collar:'0',
        nape_to_waist:'0',
        notes:'0'
      }
    },
    vest:{
      vest_back_length: '0',
      neck: '0',
      chest: '0',
      stomach: '0',
      shoulder: '0',
      front_shoulder: '0',
      nape_to_waist : '0',
      front_waist_length: '0',
      front_waist_height: '0',
      back_waist_height: '0',
      breast_highest_point:'0',
      adjustments:{
        half_back_to_stomach:'0',
        half_back_to_bottom:'0',
        armhole:'0',
        lower_back_collar:'0',
        nape_to_waist:'0',
        notes:'0'
      }
    },
  };
  bodyMeasurementsKeys: string[] = Object.keys(this.valueBodyMeasurements).filter(k => k !== 'posture');
  bodyMeasurementsPostureKeys: string[] = Object.keys(this.valueBodyMeasurements.posture);
  measurementKeysAll:any ={
    'pant':Object.keys(this.valueFinalGarmentObj.pant).filter(k => k !== 'adjustments'),
    'jacket':Object.keys(this.valueFinalGarmentObj.jacket).filter(k => k !== 'adjustments'),
    'overcoat':Object.keys(this.valueFinalGarmentObj.overcoat).filter(k => k !== 'adjustments'),
    'shirt':Object.keys(this.valueFinalGarmentObj.shirt).filter(k => k !== 'adjustments'),
    'vest':Object.keys(this.valueFinalGarmentObj.vest).filter(k => k !== 'adjustments'),
  }
  measurementFemaleKeysAll:any ={
    'pant':Object.keys(this.valueFinalGarmentFemaleOrOtherObj.pant).filter(k => k !== 'adjustments'),
    'jacket':Object.keys(this.valueFinalGarmentFemaleOrOtherObj.jacket).filter(k => k !== 'adjustments'),
    'overcoat':Object.keys(this.valueFinalGarmentFemaleOrOtherObj.overcoat).filter(k => k !== 'adjustments'),
    'shirt':Object.keys(this.valueFinalGarmentFemaleOrOtherObj.shirt).filter(k => k !== 'adjustments'),
    'vest':Object.keys(this.valueFinalGarmentFemaleOrOtherObj.vest).filter(k => k !== 'adjustments'),
  }

  measurementPlaceholderAll:any ={
    'pant':{
      "waist": '58-190 cm',
      "thigh": '39-113 cm',
      "u_rise": '50-120 cm',
      "front_waist_height": 'No value',
      "back_waist_height": 'No value',
       outseam_l:'37-135 cm',
       outseam_r:'37-135 cm',
      "knee": '30-103 cm',
      "pant_bottom": '28-80 cm',
      "calf_girth": '25-70 cm',
    },
    'jacket':{
      neck: '30-66 cm',
      chest: '66-190 cm',
      stomach: '58-185 cm',
      front_waist_length: '31-75 cm',
      sleeve_l:'30-85 cm',
      sleeve_r:'30-85 cm',
      seat: '68-200 cm',
      bicep: '19-68 cm',
      shoulder: '31-72 cm',
      front_shoulder: '29-68 cm',
      nape_to_waist : '29-63 cm',
      back_length: '47-105 cm',
    },
    'overcoat':{
      neck: '30-66 cm',
      chest: '66-190 cm',
      stomach: '58-185 cm',
      front_waist_length: '31-75 cm',
      sleeve_l:'30-85 cm',
      sleeve_r:'30-85 cm',
      seat: '68-200 cm',
      bicep: '19-68 cm',
      shoulder: '31-72 cm',
      front_shoulder: '29-68 cm',
      nape_to_waist : '29-63 cm',
      back_length: '47-105 cm',
    },
    'shirt':{
      neck: '30-66 cm',
      chest: '66-190 cm',
      stomach: '58-185 cm',
      front_waist_length: '31-75 cm',
      sleeve_l:'30-85 cm',
      sleeve_r:'30-85 cm',
      seat: '68-200 cm',
      bicep: '19-68 cm',
      shoulder: '31-72 cm',
      front_shoulder: '29-68 cm',
      nape_to_waist : '29-63 cm',
      back_length: '47-105 cm',
    },
    'vest':{
      vest_back_length: '40-78 cm',
      neck: '30-62 cm',
      chest: '72-190 cm',
      stomach: '55-185 cm',
      shoulder: '38-70 cm',
      front_shoulder: '36-68 cm',
      nape_to_waist : '35-60 cm',
      front_waist_length: '37-60 cm',
      front_waist_height: 'No value',
      back_waist_height: 'No value',
    }
  }
  measurementPlaceholderNumberAll:any ={
    'pant':{
      "waist": {
        min:58,
        max:190
      },
      "thigh": {
        min:39,
        max:113
      },
      "u_rise": {
        min:50,
        max:120
      },
  /*    "front_waist_height": {
        min:0,
        max:30
      },
      "back_waist_height": {
        min:0,
        max:21
      },*/
      "outseam_l": {
        min:37,
        max:135
      },
      "outseam_r": {
        min:37,
        max:135
      },
      "knee": {
        min:30,
        max:103
      },
      "pant_bottom": {
        min:28,
        max:80
      },
      "calf_girth": {
        min:25,
        max:70
      },
    },
    'jacket':{
      "neck": {
        min:30,
        max:66
      },
      "chest": {
        min:66,
        max:190
      },
      "stomach": {
        min:58,
        max:185
      },
      "front_waist_length": {
        min:31,
        max:75
      },
      "sleeve_l": {
        min:30,
        max:85
      },
      "sleeve_r": {
        min:30,
        max:85
      },
      "seat": {
        min:68,
        max:200
      },
      "bicep": {
        min:19,
        max:68
      },
      "shoulder": {
        min:31,
        max:72
      },
      "front_shoulder": {
        min:29,
        max:68
      },
      "nape_to_waist": {
        min:29,
        max:63
      },
      "back_length": {
        min:47,
        max:105
      },
    },
    'overcoat':{
      "neck": {
        min:30,
        max:66
      },
      "chest": {
        min:66,
        max:190
      },
      "stomach": {
        min:58,
        max:185
      },
      "front_waist_length": {
        min:31,
        max:75
      },
      "sleeve_l": {
        min:30,
        max:85
      },
      "sleeve_r": {
        min:30,
        max:85
      },
      "seat": {
        min:68,
        max:200
      },
      "bicep": {
        min:19,
        max:68
      },
      "shoulder": {
        min:31,
        max:72
      },
      "front_shoulder": {
        min:29,
        max:68
      },
      "nape_to_waist": {
        min:29,
        max:63
      },
      "back_length": {
        min:47,
        max:105
      },
    },
    'shirt':{
      "neck": {
        min:30,
        max:66
      },
      "chest": {
        min:66,
        max:190
      },
      "stomach": {
        min:58,
        max:185
      },
      "front_waist_length": {
        min:31,
        max:75
      },
      "sleeve_l": {
        min:30,
        max:85
      },
      "sleeve_r": {
        min:30,
        max:85
      },
      "seat": {
        min:68,
        max:200
      },
      "bicep": {
        min:19,
        max:68
      },
      "shoulder": {
        min:31,
        max:72
      },
      "front_shoulder": {
        min:29,
        max:68
      },
      "nape_to_waist": {
        min:29,
        max:63
      },
      "back_length": {
        min:47,
        max:105
      },
    },
    'vest':{
      "vest_back_length": {
        min:40,
        max:78
      },
      "neck": {
        min:30,
        max:62
      },
      "chest": {
        min:72,
        max:190
      },
      "stomach": {
        min:55,
        max:185
      },
      "shoulder": {
        min:38,
        max:70
      },
      "front_shoulder": {
        min:36,
        max:68
      },
      "nape_to_waist": {
        min:35,
        max:60
      },
      "front_waist_length": {
        min:37,
        max:60
      },
   /*   "front_waist_height": {
        min:0,
        max:17
      },
      "back_waist_height": {
        min:0,
        max:30
      },*/
    }
  }

  measurementPlaceholderFemaleOrOtherAll:any ={
    'pant':{
      "waist": '60-140 cm',
      "thigh": '38-99 cm',
      "u_rise": '45-90 cm',
      "back_waist_height": 'No value',
      "front_waist_height": 'No value',
      outseam_l:'70-130 cm',
      outseam_r:'70-130 cm',
      "knee": '25-70 cm',
      "pant_bottom": '28-92 cm',
      "calf_girth": '25-70 cm',
    },
    'jacket':{
      neck: '30-60 cm',
      chest: '72-146 cm',
      stomach: '55-132 cm',
      seat: '70-156 cm',
      bicep: '20-52 cm',
      shoulder: '30-60 cm',
      sleeve_l:'35-80 cm',
      sleeve_r:'35-80 cm',
      front_shoulder: '28-60 cm',
      nape_to_waist : '27-50 cm',
      back_length: '34-82 cm',
      front_waist_length: '32-57 cm',
      breast_highest_point:'22-32 cm',

    },
    'overcoat':{
      neck: '30-50 cm',
      chest: '72-147 cm',
      stomach: '55-133 cm',
      seat: '70-135.9 cm',
      bicep: '22-47 cm',
      shoulder: '35-70 cm',
      sleeve_l:'35-80 cm',
      sleeve_r:'35-80 cm',
      front_waist_length: '32-57 cm',
      front_shoulder: '28-68 cm',
      nape_to_waist : '27-50 cm',
      back_length: '40-80 cm',
      overcoat_length:'70-140 cm'
    },
    'shirt':{
      neck: '30-62 cm',
      chest: '72-189 cm',
      stomach: '55-232 cm',
      front_waist_length: '31-60 cm',
      sleeve_l:'40-70 cm',
      sleeve_r:'40-70 cm',
      seat: '70-212 cm',
      bicep: '22-68 cm',
      wrist_l:'12-33 cm',
      wrist_r:'12-33 cm',
      shoulder: '30-70 cm',
      front_shoulder: '28-68 cm',
      nape_to_waist : '30-50 cm',
      back_length: '50-120 cm',
    },
    'vest':{
      vest_back_length: '36-65 cm',
      neck: '30-62 cm',
      chest: '72-132 cm',
      stomach: '55-132 cm',
      shoulder: '30-60 cm',
      front_shoulder: '28-60 cm',
      nape_to_waist : '27-50 cm',
      front_waist_length: '32-57 cm',
      front_waist_height: 'No value',
      back_waist_height: 'No value',
      breast_highest_point:'22-32 cm',
    }
  }
  measurementPlaceholderFemaleOrOtherNumberAll:any ={
    'pant':{
      "waist": {
        min:60,
        max:140
      },
      "thigh": {
        min:38,
        max:99
      },
      "u_rise": {
        min:45,
        max:90
      },
  /*    "front_waist_height": {
        min:0,
        max:25
      },
      "back_waist_height": {
        min:0,
        max:21
      },*/
      "outseam_l": {
        min:70,
        max:130
      },
      "outseam_r": {
        min:70,
        max:130
      },
      "knee": {
        min:25,
        max:70
      },
      "pant_bottom": {
        min:28,
        max:92
      },
      "calf_girth": {
        min:25,
        max:70
      },
    },
    'jacket':{
      "neck": {
        min:30,
        max:60
      },
      "chest": {
        min:72,
        max:146
      },
      "stomach": {
        min:55,
        max:132
      },
      "front_waist_length": {
        min:32,
        max:57
      },
      "sleeve_l": {
        min:35,
        max:80
      },
      "sleeve_r": {
        min:35,
        max:80
      },
      "seat": {
        min:70,
        max:156
      },
      "bicep": {
        min:20,
        max:52
      },
      "shoulder": {
        min:30,
        max:60
      },
      "front_shoulder": {
        min:28,
        max:60
      },
      "nape_to_waist": {
        min:27,
        max:50
      },
      "back_length": {
        min:34,
        max:82
      },
      "breast_highest_point": {
        min:22,
        max:32
      },
    },
    'overcoat':{
      "neck": {
        min:30,
        max:50
      },
      "chest": {
        min:72,
        max:147
      },
      "stomach": {
        min:55,
        max:133
      },
      "front_waist_length": {
        min:32,
        max:57
      },
      "sleeve_l": {
        min:35,
        max:80
      },
      "sleeve_r": {
        min:35,
        max:80
      },
      "seat": {
        min:70,
        max:135.9
      },
      "bicep": {
        min:22,
        max:47
      },
      "shoulder": {
        min:35,
        max:70
      },
      "front_shoulder": {
        min:28,
        max:68
      },
      "nape_to_waist": {
        min:27,
        max:50
      },
      "back_length": {
        min:40,
        max:80
      },
      "overcoat_length": {
        min:70,
        max:140
      },
    },
    'shirt':{
      "neck": {
        min:30,
        max:62
      },
      "chest": {
        min:72,
        max:189
      },
      "stomach": {
        min:55,
        max:232
      },
      "front_waist_length": {
        min:31,
        max:60
      },
      "sleeve_l": {
        min:40,
        max:70
      },
      "sleeve_r": {
        min:40,
        max:70
      },
      "seat": {
        min:70,
        max:212
      },
      "bicep": {
        min:22,
        max:68
      },
      "shoulder": {
        min:30,
        max:70
      },
      "front_shoulder": {
        min:28,
        max:68
      },
      "nape_to_waist": {
        min:30,
        max:50
      },
      "back_length": {
        min:50,
        max:120
      },
      "wrist_l": {
        min:12,
        max:33
      },
      "wrist_r": {
        min:12,
        max:33
      },
    },
    'vest':{
      "vest_back_length": {
        min:36,
        max:65
      },
      "neck": {
        min:30,
        max:62
      },
      "chest": {
        min:72,
        max:132
      },
      "stomach": {
        min:55,
        max:132
      },
      "shoulder": {
        min:30,
        max:60
      },
      "front_shoulder": {
        min:28,
        max:60
      },
      "nape_to_waist": {
        min:27,
        max:50
      },
      "front_waist_length": {
        min:32,
        max:57
      },
   /*   "front_waist_height": {
        min:1,
        max:25
      },
      "back_waist_height": {
        min:1,
        max:21
      },*/
      "breast_highest_point": {
        min:22,
        max:32
      },
    }
  }

  garmentTypes: any[] = ['pant', 'jacket','overcoat','shirt','vest'];
  radioButtonCustom:any ={
    'seat':['Standard', 'Flat Seat', 'Prominent Seat', 'Drop Seat'],
    'waist_height':['Standard', 'Higher 3cm', 'Higher 2cm', 'Higher 1cm','Lower 1cm','Lower 2cm','Lower 3cm','Lower 4cm','Lower 5cm','Lower 6cm'],
    'front_rise':['Standard', 'Reduce 1cm', 'Reduce 2cm'],
    'zipper_length':['Standard', 'Add 1cm', 'Add 2cm'],
    'front_thigh':['Standard', 'Add dart', 'Add 2 darts'],
    'slope_shoulder_left':['Standard','Slight Slope','Moderate Slope','Very Slope','Slight High','Half High','High'],
    'slope_shoulder_right':['Standard','Slight Slope','Moderate Slope','Very Slope','Slight High','Half High','High'],
    'shoulder_blade':['Protruding shoulder blade','Protruding top shoulder blade'],
    'back_style':['Standard','Slight Concave','Very Concave'],
    'chest':['Standard','Single Dart','Double Dart'],
    'stomach':['Standard','Portly','Normal belly'],
    'arm':['Standard','Very Back','Slightly Back','Forward','Very Forward'],
    'soulders':['Standard','Very Back','Slightly Back','Forward','Very Forward'],
    'fit':['Extremely Slim', 'Very Slim', 'Slim', 'Regular Tight', 'Regular', 'Regular Loose', 'Loose', 'Very Loose', 'Extremely Loose'],
    'half_back_to_stomach':['Standard', 'Add 0.5cm', 'Add 1cm', 'Add 1.5cm', 'Reduce 0.5cm', 'Reduce 1cm', 'Reduce 1.5cm'],
    'half_back_to_bottom':['Standard', 'Add 0.5cm', 'Add 1cm', 'Add 1.5cm', 'Reduce 0.5cm', 'Reduce 1cm', 'Reduce 1.5cm'],
    'shoulder_pad':['Standard', 'No Pad (Wadding)', 'Pad 1cm', 'Pad 1.2cm', 'Pad 1.5cm'],
    'back_pad':['Add Back Pad 0.5cm', 'Add Back Pad 1cm', 'Add Back Pad 1.5cm'],
    'armhole':['Standard', 'Lower 0.5cm', 'Lower 1cm', 'Lower 1.5cm'],
    'lower_back_collar':['Standard', 'Lower 0.6cm', 'Lower 1cm', 'Lower 1.5cm', 'Lower 2cm'],
    'nape_to_waist':['Standard', 'Decrease 0.8cm', 'Decrease 1.2cm', 'Decrease 2cm', 'Increase 0.8cm', 'Increase 1.2cm', 'Increase 2cm'],
  }

  metafields:CustomerMetafields = {
    type: 'json',
    namespace: 'custom',
    key: "additional_info",
    value: {
      additional_info: {
        gender: 'Other',
        height: '0',
        weight: '0',
        age:0,
        fit: 'Extremely Slim',
        images: {
          "fullBodyPhotos": [],
          "inspirationImages":[]
        }
      },
      body_measurements: {...this.valueBodyMeasurements},
      final_garment: {...this.valueFinalGarmentFemaleOrOtherObj}
    },
    owner_resource: "customers",
    owner_id: ""
  };

  editingImageId: number | null = null;
  photoId: number | null = null;
  lastUpdatedBodyMeasurements$: string | undefined;
  lastUpdatedFinalGarment$: string | undefined;
  isEditMode: boolean = false;
  hasUnsavedChanges: boolean = false;

  isDropdownOpen = false;
  selectedCountry: string= '';
  isValueValidJ: number[] = [-1];
  isValueValidI: number[] = [-1];
  isValueValid: number = -1;
  constructor(
    private metafieldsService: MetafieldsService,
    private customerService: CustomersService,
    private filesService: FilesService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.currentPageCustomerList= +this.route.snapshot.queryParams['currentPage'] || 1;
    this.customerId = this.route.snapshot.paramMap.get('id');
    if (this.customerId) {
      this.metafieldsService.getCustomerMetafieldsProfileCompleted(this.customerId).subscribe((res)=>{
        console.info('getCustomerMetafieldsProfileCompleted', res);
        this.profile_completed = res.data.value
      })

      this.customerService.getCustomer(this.customerId)
        .subscribe((res) => {
          this.customer = res.data;
        });

      this.metafieldsService.getCustomerMetafields(this.customerId).subscribe((res) => {
        this.metafields = (res.data && res.data.id) ? res.data : this.metafields;
        this.metafields.owner_id = this.customerId;

        console.log('get res', res.data);

        if (!res.data.id) {
          this.metafields.value['body_measurements']['breast_highest_point']='0';
          this.bodyMeasurementsKeys.push('breast_highest_point')
          this.metafieldsService.createCustomerMetafields(this.metafields).subscribe((res) => {
            console.log('create res', res);
            this.metafields.id = res.data.id;
          });
        } else {
         /* Object.keys(this.metafields.value.body_measurements).forEach((key) => {
            if (this.metafields.value.body_measurements[key][0] && typeof this.metafields.value.body_measurements[key] === 'object') {
              console.log(this.metafields.value.body_measurements[key][0])
                this.metafields.value.body_measurements[key] = this.metafields.value.body_measurements[key].shift()
            }
          });
          Object.keys(this.metafields.value.final_garment).forEach((key) => {
            if (this.metafields.value.final_garment[key][0] && typeof this.metafields.value.final_garment[key] === 'object') {
                this.metafields.value.final_garment[key] = this.metafields.value.final_garment[key].shift()
            }
          });*/
        }
        if(this.metafields.value.additional_info['gender']==='Female' || this.metafields.value.additional_info['gender']==='Other' ){
          this.bodyMeasurementsKeys.push('breast_highest_point')
        }
        this.lastUpdatedBodyMeasurements$ = this.metafields.value.body_measurements['lastUpdate'];
        this.lastUpdatedFinalGarment$ = this.metafields.value.final_garment['lastUpdate'];
      });
    }

    this.debounceSubject.pipe(
      debounceTime(500)
    ).subscribe(value => {
      this.updateMetafieldsValue();
    });
    this.debounceText.pipe(
      debounceTime(500)
    ).subscribe(value => {
      this.updateCustomer();
    });
  }

  ngOnDestroy() {
    this.debounceSubject.unsubscribe();
    this.debounceText.unsubscribe();
  }

  enterEditMode(): void {
    this.isEditMode = true;
  }

  saveChanges(): void {
    this.isEditMode = false;
    this.debounceSubject.next('test');
  }

  selectCountry(country: string): void {
    this.selectedCountry = country;
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  closeDropdown() {
    // Викликати Bootstrap-функцію для закриття дропдауну
    const dropdownToggle = document.getElementById('dropdownMenuButton1');
    if (dropdownToggle) {
      dropdownToggle.dispatchEvent(new Event('click'));
    }
  }

  updateAdditionalInfoMetafield(ev: any, value: any) {
    if(value!=='age'){
      const val = ev.length > 0 ? ev : '0';
      if(value=='gender' && val!=='Male' && this.metafields.value['additional_info']['gender']==='Male' ){
        this.metafields.value['final_garment']['jacket']['breast_highest_point']='0';
        this.metafields.value['final_garment']['overcoat']['overcoat_length']='0';
        this.metafields.value['final_garment']['shirt']['wrist_l']='0';
        this.metafields.value['final_garment']['shirt']['wrist_r']='0';
        this.metafields.value['final_garment']['vest']['breast_highest_point']='0';
        if(!this.bodyMeasurementsKeys.includes('breast_highest_point')){
          this.metafields.value['body_measurements']['breast_highest_point']='0';
          this.bodyMeasurementsKeys.push('breast_highest_point')
        }
      }
      this.metafields.value['additional_info'][value] = val;
    }
    else {
      const val = ev.length > 0 ? ev : '0';
      this.metafields.value['additional_info'][value] = +val;
    }
    console.log('RRRRR',this.metafields)
  }
  onInputBlur(ev: any,i:number,j:number,type:string,ms:string,gender:string) {
    if(ev!=='0' || ms==='front_waist_height' ||ms==='back_waist_height' ){
      let objMinAndMax:any
      if(gender === 'Male'){
        objMinAndMax=this.measurementPlaceholderNumberAll[type][ms];
      }else {
        objMinAndMax=this.measurementPlaceholderFemaleOrOtherNumberAll[type][ms];
      }
      console.log('objMinAndMax',objMinAndMax)
      const digits = ev.match(/\d+/g);
      if (digits) {
        console.log('digits',digits);
        const extractedNumber = parseInt(digits[0]);
        if(extractedNumber < objMinAndMax.min || (extractedNumber > objMinAndMax.max && extractedNumber !== objMinAndMax.max) ){
          this.isValueValid = 1
          this.isValueValidJ.push(j)
          this.isValueValidI.push(i)
        }else {
          const indexToRemoveJ = this.isValueValidJ.indexOf(j);
          const indexToRemoveI = this.isValueValidI.indexOf(i);
          this.isValueValidJ.splice(indexToRemoveJ, 1);
          this.isValueValidI.splice(indexToRemoveI, 1);
          this.isValueValid = -1
        }
      } else {
        this.isValueValidJ.push(j)
        this.isValueValidI.push(i)
        this.isValueValid = 1
      }
    }else {
      const indexToRemoveJ = this.isValueValidJ.indexOf(j);
      const indexToRemoveI = this.isValueValidI.indexOf(i);
      this.isValueValidJ.splice(indexToRemoveJ, 1);
      this.isValueValidI.splice(indexToRemoveI, 1);
      this.isValueValid = -1
    }
  }
  updateBodyMeasurementsMetafield(ev: any, group: any, value: any) {
    const val = ev.length > 0 ? ev : '0';
    this.metafields.value[group][value] = val;
  }
  updateBodyMeasurementsPostureMetafield(ev: any, group: any, value: any) {
    const val = ev.length > 0 ? ev : '0';
    this.metafields.value[group]['posture'][value] = val;
  }
  updateFinalGarmentMetafield(ev: any, group: any, value: any) {
    const val = ev.length > 0 ? ev : '0';
    this.metafields.value.final_garment[group][value] = val;
  }
  updateFinalGarmentAdjustmentsMetafield(ev: any, group: any, value: any) {
    const val = ev.length > 0 ? ev : '0';
    this.metafields.value.final_garment[group]['adjustments'][value] = val;
  }


  updateNote(ev: any) {
    if (!this.customer) return;
    this.customer.note = ev;
    this.debounceText.next(ev);
  }

  updateMetafieldsValue() {
    this.metafieldsService.updateCustomerMetafields(this.metafields).subscribe((res) => {
      console.info('update res', res);
    });
  }

  updateCustomer() {
    if (!(this.customerId && this.customer)) return;

    this.customerService.setCustomer(this.customerId, this.customer).subscribe((res) => {
      console.info('update customer', res);
    });
  }

  selectedBodyPhotos(event: any) {
    const files = event.target.files;
    const formdata = new FormData();

    if (files && files.length > 0) {
      const file = files[0];

      formdata.append('file', file, file.name);
    }

    this.filesService.uploadImage(formdata).pipe(
      concatMap((res) => {
        if (res.data?.url?.length) {
          return timer(this.IMG_WAIT_DELAY).pipe(
            concatMap(() => this.filesService.checkImageAvailability(res.data.url, res.data.shortId))
          );
        } else {
          return of(null);
        }
      }),
      takeWhile((response: any) => {console.log(response);return response !== null && response.status !== 200}, true),
      catchError((error) => {
        console.log('Error:', error);

        return throwError(error);
      })
    ).subscribe((response) => {
      if (response && response.status === 200) {
        this.metafields.value.additional_info['images'].fullBodyPhotos.push({
          id: +response.id,
          url: response.data.url
        });
        this.updateMetafieldsValue();
      }
    });
  }

  selectedInspirationPhoto(event: any) {
    const files = event.target.files;
    const formdata = new FormData();

    if (files && files.length > 0) {
      const file = files[0];

      formdata.append('file', file, file.name);
    }

    console.log('formdata', formdata.getAll('file'));

    this.filesService.uploadImage(formdata).subscribe(res => {
      console.log('upload res', res);
      if (res.data?.url?.length) {
        this.metafields.value.additional_info['images'].inspirationImages.push({
          id: +res.data.shortId,
          url: res.data.url,
          description: ''
        });
        this.updateMetafieldsValue();
      }
    });
  }

  setEditingPhoto(i: number) {
    this.editingImageId = i;
  }
  setOpenBodyPhoto(i: number) {
    this.photoId = i;
  }

  testF(garment: string):string[] {
    if (this.valueFinalGarmentObj[garment]?.adjustments) {
      return Object.keys(this.valueFinalGarmentObj[garment].adjustments);
    }

    return []
  }

  testP(gender: string):any {
    if (gender==='Male') {
      return {
        'pant':Object.keys(this.valueFinalGarmentObj.pant).filter(k => k !== 'adjustments'),
        'jacket':Object.keys(this.valueFinalGarmentObj.jacket).filter(k => k !== 'adjustments'),
        'overcoat':Object.keys(this.valueFinalGarmentObj.overcoat).filter(k => k !== 'adjustments'),
        'shirt':Object.keys(this.valueFinalGarmentObj.shirt).filter(k => k !== 'adjustments'),
        'vest':Object.keys(this.valueFinalGarmentObj.vest).filter(k => k !== 'adjustments'),
      }
    }
    else {
      return {
        'pant':Object.keys(this.valueFinalGarmentFemaleOrOtherObj.pant).filter(k => k !== 'adjustments'),
        'jacket':Object.keys(this.valueFinalGarmentFemaleOrOtherObj.jacket).filter(k => k !== 'adjustments'),
        'overcoat':Object.keys(this.valueFinalGarmentFemaleOrOtherObj.overcoat).filter(k => k !== 'adjustments'),
        'shirt':Object.keys(this.valueFinalGarmentFemaleOrOtherObj.shirt).filter(k => k !== 'adjustments'),
        'vest':Object.keys(this.valueFinalGarmentFemaleOrOtherObj.vest).filter(k => k !== 'adjustments'),
      }
    }
  }
  updateImageDescription(ev: any, id: number) {
    this.metafields.value.additional_info['images'].inspirationImages[id].description = ev.target.value;
    this.updateMetafieldsValue();
  }

  deleteImage(id: number, group: string) {
    this.filesService.deleteImage(id).subscribe(res => {
      console.log('delete res', res);
      this.metafields.value.additional_info['images'][group] = this.metafields.value.additional_info['images'][group].filter((img: any) => img.id !== id);

      this.updateMetafieldsValue();
    });
  }

  checkboxChanged(event: any) {
    this.profile_completed=event
    this.metafieldsService.updateCustomerMetafieldsProfileCompleted({owner_id:this.customerId,flag:this.profile_completed}).subscribe((res) => {
      console.info('updateCustomerMetafieldsProfileCompleted', res);
    });
  }
}
