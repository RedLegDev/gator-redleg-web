
import React from 'react';
import { Medal } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const DecorationSection: React.FC = () => {
  return (
    <div className="mb-12">
      <div className="flex items-center mb-4">
        <div className="mr-4 p-2 bg-redleg/10 rounded-full">
          <Medal className="h-6 w-6 text-redleg" />
        </div>
        <h2 className="text-3xl font-bold text-artillery">Unit Decorations</h2>
      </div>
      
      <div className="prose prose-lg max-w-none text-artillery-muted mb-6">
        <p>
          The 116th Field Artillery has been recognized for exceptional service and valor throughout its operational history. 
          The following decorations highlight the unit's distinguished service to the nation during various conflicts.
        </p>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <Table>
          <TableHeader className="bg-artillery-50">
            <TableRow>
              <TableHead className="w-24 text-center">Ribbon</TableHead>
              <TableHead>Award</TableHead>
              <TableHead>Streamer Embroidered</TableHead>
              <TableHead>Order No.</TableHead>
              <TableHead>Unit Awarded</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="text-center">
                <div className="w-16 h-8 bg-red-700 mx-auto border border-gray-300 shadow-sm"></div>
              </TableCell>
              <TableCell className="font-medium text-blue-600 hover:text-blue-800">
                Meritorious Unit Commendation
              </TableCell>
              <TableCell>Afghanistan 10 July 2005 to 7 July 2006</TableCell>
              <TableCell>Army General Orders 2018–23, dated 6 September 2018</TableCell>
              <TableCell>2d Battalion, 116th Field Artillery</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-center">
                <div className="w-16 h-8 bg-red-700 mx-auto border border-gray-300 shadow-sm"></div>
              </TableCell>
              <TableCell className="font-medium text-blue-600 hover:text-blue-800">
                Meritorious Unit Commendation
              </TableCell>
              <TableCell>Iraq 2005 to 2006</TableCell>
              <TableCell>AAMH-FPO Memorandum, dated 27 August 2008</TableCell>
              <TableCell>3d Battalion, 116th Field Artillery</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-center">
                <div className="w-16 h-8 flex flex-col mx-auto border border-gray-300 shadow-sm">
                  <div className="h-1/3 bg-blue-600"></div>
                  <div className="h-1/3 bg-white"></div>
                  <div className="h-1/3 bg-red-600"></div>
                </div>
              </TableCell>
              <TableCell className="font-medium text-blue-600 hover:text-blue-800">
                Philippine Presidential Unit Citation
              </TableCell>
              <TableCell>17 October 1944 to 4 July 1945</TableCell>
              <TableCell>Department of the Army General Orders 47-1950</TableCell>
              <TableCell>116th Field Artillery and 149th Field Artillery Battalions</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      
      <div className="mt-4 text-sm text-gray-500 italic">
        <p>Source: United States Army Center of Military History records and official unit citations.</p>
      </div>
    </div>
  );
};

export default DecorationSection;
