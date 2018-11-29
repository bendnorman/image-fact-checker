from BaseHTTPServer import BaseHTTPRequestHandler, HTTPServer
import urlparse
from SnopesParser import SnopesParser


PORT_NUMBER = 8080

# This class will handles any incoming request from
# the browser


class myHandler(BaseHTTPRequestHandler):

    # Handler for the GET requests
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type', 'text/html')
        self.end_headers()
        
        query = urlparse.parse_qs(self.path[2:])
        if query != {}:
            image_url = query['image_url'][0]
            image_rating = parser.image_compare(image_url)
            
            if image_rating is not None:
                self.wfile.write(image_rating)
            else:
                self.wfile.write("None")
            

        
        # Send the html message
        
        return


try:
    # Create a web server and define the handler to manage the
    # incoming request
    print "\nParsing Snopes Articles..."
    parser = SnopesParser(threshold=10)
    parser.start()
    print "Finished Parsing and Hashing Snopes data.\n"
    
    
    server = HTTPServer(('', PORT_NUMBER), myHandler)
    print 'Started httpserver on port ', PORT_NUMBER

    # Wait forever for incoming htto requests
    server.serve_forever()

except KeyboardInterrupt:
    print '^C received, shutting down the web server'
    server.socket.close()
