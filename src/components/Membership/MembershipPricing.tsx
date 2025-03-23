
import React from 'react';
import { DollarSign } from 'lucide-react';
import { 
  Card, 
  CardContent,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";

const MembershipPricing = () => {
  return (
    <div className="mb-12">
      <div className="flex items-center mb-6">
        <DollarSign className="h-6 w-6 text-redleg mr-3" />
        <h2 className="text-2xl font-bold text-artillery">Membership Pricing</h2>
      </div>
      
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Annual Membership</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$25.00</div>
            <p className="text-sm text-gray-500">1 Year Membership</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>3 Year Membership</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$60.00</div>
            <p className="text-sm text-gray-500">Save $15 over annual rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>5 Year Membership</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$100.00</div>
            <p className="text-sm text-gray-500">Save $25 over annual rate</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MembershipPricing;
