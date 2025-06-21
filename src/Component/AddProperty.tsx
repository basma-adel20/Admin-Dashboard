import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';

const propertyTypes = ['villa', 'apartment', 'studio', 'house', 'cottage'];

type Property = {
  id: string;
  title: string;
  description: string;
  type: string;
  pricePerNight: number;
  location: string;
  imageUrl: string;
  available: boolean;
};

export default function AddProperty() {
  const navigate = useNavigate();
  const [nextId, setNextId] = useState<string>('1');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch all properties to determine the next available ID
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch('http://localhost:3001/properties');
        if (!response.ok) throw new Error('Failed to fetch properties');
        
        const properties: Property[] = await response.json();
        
        const numericIds = properties
          .map(property => parseInt(property.id))
          .filter(id => !isNaN(id));
        
        const maxId = numericIds.length > 0 ? Math.max(...numericIds) : 0;
        setNextId((maxId + 1).toString());
        
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to determine next ID');
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const initialValues: Property = {
    id: nextId,
    title: '',
    description: '',
    type: 'villa',
    pricePerNight: 0,
    location: '',
    imageUrl: '',
    available: true,
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    type: Yup.string().required('Type is required').oneOf(propertyTypes),
    pricePerNight: Yup.number().required('Price is required').min(1, 'Price must be at least 1'),
    location: Yup.string().required('Location is required'),
    imageUrl: Yup.string().url('Must be a valid URL').required('Image URL is required'),
    available: Yup.boolean(),
  });

  const handleSubmit = async (values: Property) => {
    try {
      setLoading(true);
      
      const response = await fetch('http://localhost:3001/properties', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) throw new Error('Failed to create property');

      navigate('/properties');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create property');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className=" mx-auto px-4 max-w-7xl">
      <div className="flex items-center mb-5">
        <PlusIcon className="h-8 w-8 text-[#443120] mr-2" />
        <h1 className="text-3xl font-bold text-gray-800">Add New Property</h1>
      </div>
      
      {error && (
        <div className="mb-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
          <p>{error}</p>
        </div>
      )}

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ isSubmitting }) => (
          <Form className="bg-white shadow rounded-lg px-10 py-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <Field
                  name="title"
                  type="text"
                  className="mt-1 block w-full rounded-md px-1 py-1 border border-black-200 shadow-sm focus:border-black-500 focus:ring-black-500 sm:text-sm"
                />
                <ErrorMessage name="title" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                  Type
                </label>
                <Field
                  as="select"
                  name="type"
                  className="mt-1 block w-full rounded-md px-1 py-1 border border-black-200 shadow-sm focus:border-black-500 focus:ring-black-500 sm:text-sm "
                >
                  {propertyTypes.map((type) => (
                    <option key={type} value={type} >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="type" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <label htmlFor="pricePerNight" className="block text-sm font-medium text-gray-700">
                  Price Per Night ($)
                </label>
                <Field
                  name="pricePerNight"
                  type="number"
                  className="mt-1 block w-full rounded-md px-1 py-1 border border-black-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
                <ErrorMessage name="pricePerNight" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                  Location
                </label>
                <Field
                  name="location"
                  type="text"
                  className="mt-1 block w-full rounded-md px-1 py-1 border border-black-200 shadow-sm sm:text-sm"/>
                <ErrorMessage name="location" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <Field
                  as="textarea"
                  name="description"
                  rows={3}
                  className="mt-1 block w-full rounded-md px-1 py-1 border border-black-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm "
                />
                <ErrorMessage name="description" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
                  Image URL
                </label>
                <Field
                  name="imageUrl"
                  type="url"
                  className="mt-1 block w-full rounded-md px-1 py-1 border border-black-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
                <ErrorMessage name="imageUrl" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <div className="flex items-center">
                  <Field
                    name="available"
                    type="checkbox"
                    className="h-4 w-4 rounded border border-gray-300 text-[#443120] focus:ring-[#443120] accent-[#443120] "
                  />
                  <label htmlFor="available" className="ml-2 block text-sm text-gray-900">
                    Available
                  </label>
                </div>
              </div>
            </div>

            <div className="mt-3 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => navigate('/properties')}
                className="px-4 py-2 border border-gray-200 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#443120] dark:bg-[#000] dark:hover:bg-[#443120]  hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating...
                  </span>
                ) : 'Add Property'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}