class PharmacyAdapter

  def initialize
    
  end


  def get_pharmacies(zip_code)
    [
      {
        id: '1',
        name: 'Pharmacy 1',
        address: '123 Main St',
        city: 'NY',
        state: 'NY',
        zipcode: '10003',
        recommended: true,
        numberOfPharmacists: '1',
        otc: true,
      },
      {
        id: '2',
        name: 'Pharmacy 2',
        address: '456 Main St',
        city: 'NY',
        state: 'NY',
        zipcode: '10012',
        recommended: false,
        numberOfPharmacists: '2',
        otc: false,
      },
      {
        id: '3',
        name: 'Pharmacy 3',
        address: '789 Main St',
        city: 'NY',
        state: 'NY',
        zipcode: '10065',
        recommended: true,
        numberOfPharmacists: '5',
        otc: true,
      },
      {
        id: '4',
        name: 'Pharmacy 4',
        address: '111 Main St',
        city: 'NY',
        state: 'NY',
        zipcode: '10023',
        recommended: false,
        numberOfPharmacists: '1',
        otc: false,
      },
    ]
  end
end
