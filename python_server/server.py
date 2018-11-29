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
            print image_url
            # self.wfile.write("Malformed request")
            print parser.hash_and_ratings

        
        # Send the html message
        
        return


try:
    # Create a web server and define the handler to manage the
    # incoming request
    parser = SnopesParser()
    parser.start()
    
    server = HTTPServer(('', PORT_NUMBER), myHandler)
    print 'Started httpserver on port ', PORT_NUMBER

    # Wait forever for incoming htto requests
    server.serve_forever()

except KeyboardInterrupt:
    print '^C received, shutting down the web server'
    server.socket.close()
