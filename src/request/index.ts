import axios, { Method } from 'axios'
import { message, notification } from 'antd'
import idWorker from './id-worker'

const {AWS} = <any>window

interface OptionsModal {
  ignoreAuth?: boolean;
  authToken?: string;
}

interface ParamModal {
  method: Method;
  url: string;
  data?: any;
  params?: any;
}

interface ServiceTypeModal {
  serviceType: any
}

interface UploadAwsModal {
  file: any;
  successCb: any;
  errorCb: any;
  awsParams: any;
  ACL: string
}

interface UploadModal {
  file: any;
  serviceType: string;
  successCb: any;
  errorCb: any;
}

const api = (param: ParamModal, options: OptionsModal = {}): Promise<any> => {
  const { method, url, data, params } = param
  const { ignoreAuth = false, authToken  } = options
  return axios({
    method,
    url,
    params,
    data,
    headers: ignoreAuth ? undefined :  {
      'Authorization': authToken || localStorage.getItem('authToken')
    }
  }).then(res => {
    return {
      data: res.data,
      headers: res.headers
    }
  }).catch(error => {
		notification.error({
			message: error.response.data.message
		})
    throw error
  })
}

// eslint-disable-next-line func-names
export const getAwsParams = function(params: ServiceTypeModal): Promise<any> {
  const { serviceType } = params
  return api({
    url: '/api/aws/config',
    method: 'GET',
    params: {
      serviceType
    }
  }).then(res => {
    return res.data
  })
}

// eslint-disable-next-line func-names
export const uploadAws = function(params: UploadAwsModal): any {
  const { file, successCb, errorCb, awsParams, ACL = 'public-read' } = params
  const suffix = file.name.split('.').pop()
  const fileName = `${idWorker.next()}.${suffix}`
  console.log(AWS)
  AWS.config.update({
    region: awsParams.region,
    credentials: new AWS.Credentials({
      accessKeyId: awsParams.accessKeyId,
      secretAccessKey: awsParams.secretAccessKey
      // sessionToken: awsParams.credentials.session_token
    })
  })
  const s3 = new AWS.S3({
    apiVersion: '2006-03-01',
    params: { Bucket: awsParams.s3Bucked }
  })
  s3.upload(
    {
      Key: `${awsParams.baseUrl}/${fileName}`,
      Body: file,
      ACL
    },
    (err: any, data: any) => {
      if (err) {
         if(errorCb) errorCb(err)
        message.error('There was an error when uploading: ', err.message)
        return
      }
      if(successCb) successCb(data)
    }
  )
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const upload = (params: UploadModal) => {
  const { file, serviceType = 'DHARMA_PIC', successCb, errorCb } = params
  getAwsParams({ serviceType }).then(res => {
    const awsParams = res
    uploadAws({ file, awsParams, ACL: 'public-read', successCb, errorCb })
  })
  return false
}


export {
  api,
  upload,
}
