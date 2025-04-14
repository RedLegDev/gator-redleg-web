
import React from 'react';
import { Book } from 'lucide-react';
import { 
  Card, 
  CardContent,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";

const LifetimeMembership = () => {
  return (
    <div className="mb-12">
      <div className="flex items-center mb-6">
        <Book className="h-6 w-6 text-redleg mr-3" />
        <h2 className="text-2xl font-bold text-artillery">Lifetime Membership Options</h2>
      </div>
      
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Age 17-40</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$425.00</div>
            <p className="text-sm text-gray-500">Lifetime Membership</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Age 41-50</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$410.00</div>
            <p className="text-sm text-gray-500">Lifetime Membership</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Age 51-60</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$365.00</div>
            <p className="text-sm text-gray-500">Lifetime Membership</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Age 61-70</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$300.00</div>
            <p className="text-sm text-gray-500">Lifetime Membership</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Age 71-80</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$265.00</div>
            <p className="text-sm text-gray-500">Lifetime Membership</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Age 80+</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$215.00</div>
            <p className="text-sm text-gray-500">Lifetime Membership</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LifetimeMembership;
